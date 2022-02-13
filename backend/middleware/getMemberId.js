const con = require("../config/db");
const apiResponse = require("../helpers/apiResponse");

// middleware for doing role-based permissions
module.exports = function (req, res, next) {
  // return a middleware
  try {
    console.log(`...${req.body.project_id}`);
    const sql = `SELECT id from members WHERE users_id = ? AND projects_id = ?`;
    con.query(sql, [req.user.id, req.body.project_id], (err, dbResponse) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      console.log(dbResponse[0].id);
      req.member = dbResponse[0].id;
      next();
    });
  } catch (err) {
    console.error("Cannot get member id");
    return apiResponse.ErrorResponse(res, err.message);
  }
};
