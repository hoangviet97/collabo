const jwt = require("jsonwebtoken");
const con = require("../config/db");
const apiResponse = require("../helpers/apiResponse");

// middleware for doing role-based permissions
module.exports = function permit(...permittedRoles) {
  // return a middleware
  return (req, res, next) => {
    try {
      const sql = `SELECT roles.name FROM members INNER JOIN roles ON members.roles_id = roles.id WHERE users_id = ? AND projects_id = ?`;
      con.query(sql, [req.user.id, req.params.project], (err, dbResponse) => {
        if (err) return apiResponse.ErrorResponse(res, err.message);

        if (permittedRoles.includes(dbResponse[0].name)) {
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
};
