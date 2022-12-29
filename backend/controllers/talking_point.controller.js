const Talking_point = require("../model/Talking_point");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Talking_point.create(req.body.text, req.params.session));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Talking_point.find(req.params.session));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateCheck: async function (req, res) {
    try {
      return res.json(await Talking_point.updateCheck(req.body.val, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
