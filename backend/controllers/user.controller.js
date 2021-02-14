const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation/auth");
const con = require("../config/db");

module.exports = {
  create: function (req, res) {
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(500).json({
        message: error || "Some error occurred while creating a new user."
      });
    }

    User.createUser(req.body, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err || err.message || "Some error occurred while creating a new user."
        });
      } else {
        return res.json(result);
      }
    });
  },

  login: function (req, res) {
    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(500).json({
        message: error || "Some error occurred while creating a new user."
      });
    }

    User.loginUser(req.body, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err || err.message || "Some error occurred while creating a new user."
        });
      } else res.json(result);
    });
  }
};
