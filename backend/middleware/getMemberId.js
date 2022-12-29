const con = require("../config/db");
const apiResponse = require("../helpers/apiResponse");

module.exports = function (req, res, next) {
  try {
    const sql = `SELECT id from members WHERE users_id = ? AND projects_id = ?`;
    con.query(sql, [req.user.id, req.params.project], (err, dbResponse) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      req.member = dbResponse[0].id;
      next();
    });
  } catch (err) {
    console.error("Cannot get member id");
    return apiResponse.ErrorResponse(res, err.message);
  }
};
