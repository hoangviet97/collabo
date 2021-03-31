const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) return apiResponse.unauthorizedResponse(res, "No token, authorization denied");

  // Verify token
  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) return apiResponse.unauthorizedResponse(res, "Unvalid token, authorization denied");

      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return apiResponse.ErrorResponse(res, err.message);
  }
};
