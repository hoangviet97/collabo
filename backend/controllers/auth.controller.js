const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation/auth");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  create: async function (req, res) {
    try {
      return res.json(await User.createUser(req.body));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  login2: async function (req, res) {
    try {
      return res.json(await User.loginUser2(req.body));
    } catch (err) {
      console.log(err.message);
      return res.status(501).json({ message: err.message });
    }
  },

  resetPassword: function (req, res) {
    User.resetPwd(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  setNewPassword: async function (req, res) {
    try {
      return res.json(await User.setNewPassword(req.body.token, req.body.password));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
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
