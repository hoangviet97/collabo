const Timer = require("../model/Timer");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Timer.create(req.body, req.member));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Timer.findByProject(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getSum: async function (req, res) {
    try {
      return res.json(await Timer.getSum(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAllPersonal: async function (req, res) {
    try {
      return res.json(await Timer.find(req.member));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
