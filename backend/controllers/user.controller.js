const User = require("../model/User");
const multer = require("multer");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  getCurrentUser: function (req, res) {
    User.getUser(req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
