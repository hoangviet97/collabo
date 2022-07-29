const jwt = require("jsonwebtoken");
const con = require("../config/db");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    const sql = `SELECT * FROM members WHERE users_id = ? AND projects_id = ?`;
    con.query(sql, [req.user.id, req.params.project], (err, dbResponse) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      if (dbResponse.length > 0) {
        console.log(dbResponse);
        next();
      } else {
        console.log(dbResponse.length);
        return apiResponse.ErrorResponse(res, "Access denied");
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return apiResponse.ErrorResponse(res, err.message);
  }
};
