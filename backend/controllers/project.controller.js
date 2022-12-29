const Project = require("../model/Project");
const Member = require("../model/Member");
const { projectValidation } = require("../validation/project");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Project.create(req.body, req.user.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  // Get all user's projects
  getAll: async function (req, res) {
    try {
      return res.json(await Project.find(req.user.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  // Get specific project
  getOne: async function (req, res) {
    try {
      return res.json(await Project.findOne(req.params.project, req.user.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  setFavorite: async function (req, res) {
    try {
      return res.json(await Project.setFavoriteProject(req.body.status, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  setBudget: async function (req, res) {
    try {
      return res.json(await Project.setBudget(req.body.budget, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  setCurrency: async function (req, res) {
    try {
      return res.json(await Project.setCurrency(req.body.currency, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateColor: async function (req, res) {
    try {
      return res.json(await Project.updateColor(req.body.color, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateStatus: async function (req, res) {
    try {
      return res.json(await Project.updateStatus(req.body.status, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  deleteProject: async function (req, res) {
    try {
      return res.json(await Project.delete(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
