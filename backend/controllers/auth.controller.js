const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation/auth");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    const { error } = registerValidation(req.body);

    if (error) return apiResponse.validationErrorWithData(res, error.message, error);

    User.createUser(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err);
      return res.json(result);
    });
  },

  // User login
  login: function (req, res) {
    const { error } = loginValidation(req.body);

    User.loginUser(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err);
      console.log(err);
      return res.json(result);
    });
  },

  resetPassword: function (req, res) {
    User.resetPwd(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  verify: async function (req, res) {
    try {
      return res.json(await User.verify(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  changeColor: async function (req, res) {
    try {
      return res.json(await User.changeColor(req.user.id, req.body.color));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  changeFirstname: async function (req, res) {
    try {
      return res.json(await User.changeFirstname(req.user.id, req.body.firstname));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  changeLastname: function (req, res) {
    User.changeLastname(req.user.id, req.body.lastname, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  changePassword: function (req, res) {
    User.changePwd(req.body, req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
