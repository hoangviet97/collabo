const Review = require("../model/Review");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Review.create(req.member, req.body));
    } catch (err) {
      console.log(err.message);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Review.find(req.params.member));
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    try {
      return res.json(await Review.delete(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  accept: async function (req, res) {
    try {
      return res.json(await Review.accept(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
