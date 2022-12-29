const User = require("../model/User");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  getCurrentUser: async function (req, res) {
    try {
      return res.json(await User.getUser(req.user.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
