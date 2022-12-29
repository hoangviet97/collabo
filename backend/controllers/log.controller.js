const Log = require("../model/Log");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  getAll: async function (req, res) {
    try {
      return res.json(await Log.findAll(req.member));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
