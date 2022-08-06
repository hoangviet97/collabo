const Income = require("../model/Income");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: async function (req, res) {
    try {
      return res.json(await Income.create(req.params.project, req.member, req.body.title, req.body.amount));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  findAll: async function (req, res) {
    try {
      return res.json(await Income.find(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getSum: async function (req, res) {
    try {
      return res.json(await Income.getSum(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    try {
      return res.json(await Income.delete(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
