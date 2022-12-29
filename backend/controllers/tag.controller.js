const Tag = require("../model/Tag");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Tag.create(req.body, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  createTaskTag: async function (req, res) {
    try {
      return res.json(await Tag.createTaskTag(req.body));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Tag.find(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getTagsByTasks: async function (req, res) {
    try {
      return res.json(await Tag.findByTasks(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  deleteTag: async function (req, res) {
    try {
      return res.json(await Tag.deleteTag(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
