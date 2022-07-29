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

  getByProject: async function (req, res) {
    console.log("..s");
    try {
      return res.json(await Review.findAll(req.params.project));
    } catch (err) {
      console.log(err);
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

  getPanel: async function (req, res) {
    console.log("oooooooo");
    try {
      return res.json(await Review.findPanel(req.params.project));
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    try {
      return res.json(await Review.delete(req.params.id, req.body.task_id));
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  accept: async function (req, res) {
    try {
      return res.json(await Review.accept(req.params.id, req.body.task_id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
