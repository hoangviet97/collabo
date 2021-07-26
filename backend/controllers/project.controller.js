const Project = require("../model/Project");
const Member = require("../model/Member");
const { projectValidation } = require("../validation/project");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: function (req, res) {
    const { error } = projectValidation(req.body);

    if (error) return apiResponse.validationErrorWithData(res, error.message, error);

    Project.create(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      Member.create(req.user.id, result.projectId, (err, resu) => {
        if (err) return apiResponse.ErrorResponse(res, err.message);
        return res.json(result.projectData);
      });
    });
  },

  // Get all user's projects
  getAll: function (req, res) {
    Project.find(req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      //req.app.get("io").emit("test2", req.user.id);

      return res.json(result);
    });
  },

  getOne: function (req, res) {
    Project.findOne(req.body.id, req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err);
      return res.json(result);
    });
  },

  setFavorite: function (req, res) {
    Project.setFavoriteProject(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateColor: function (req, res) {
    Project.updateColor(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateStatus: function (req, res) {
    Project.updateStatus(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
