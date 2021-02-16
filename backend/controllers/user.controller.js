const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation/auth");
const apiResponse = require("../helpers/apiResponse");
const con = require("../config/db");

module.exports = {
  create: function (req, res) {
    const { error } = registerValidation(req.body);

    if (error) apiResponse.validationErrorWithData(res, error.message, error);

    User.createUser(req.body, (err, result) => {
      if (err) apiResponse.ErrorResponse(res, err.message);
      res.json(result);
    });
  },

  login: function (req, res) {
    const { error } = loginValidation(req.body);

    if (error) apiResponse.validationErrorWithData(res, error.message, error);

    User.loginUser(req.body, (err, result) => {
      if (err) apiResponse.ErrorResponse(res, err.message);
      res.json(result);
    });
  }
};
