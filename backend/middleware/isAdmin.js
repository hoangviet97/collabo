const jwt = require("jsonwebtoken");
const con = require("../config/db");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    const sql = `SELECT members.roles_id FROM members WHERE users_id = ? AND projects_id = ?`;
    con.query(sql, [req.user.id, req.body.project], (err, dbResponse) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      if (dbResponse[0].roles_id === "0") {
        next();
      } else {
        return apiResponse.unauthorizedResponse(res, "Access denied");
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return apiResponse.ErrorResponse(res, err.message);
  }
};
