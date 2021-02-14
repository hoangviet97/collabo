const User = require("../model/User");
const { registerValidation } = require("../validation/auth");
const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  createUser: function (req, res) {
    User.create(req.body, (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Some error occurred while creating the Customer."
        });
      } else res.json(result);
    });
  }
};
