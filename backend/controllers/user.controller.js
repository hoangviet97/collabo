const User = require("../model/User");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  getCurrentUser: function (req, res) {
    User.getUser(req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      res.json(result);
    });
  }
};
