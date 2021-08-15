const Task = require("../model/Task");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: function (req, res) {
    Task.create(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      return res.json(result);
    });
  },

  getAll: function (req, res) {
    req.app.get("io").emit("test", "test sucess");
    Task.getAllTasks(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getPersonal: function (req, res) {
    Task.getPersonalTasks(req.body.id, req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updatePriority: function (req, res) {
    console.log(req.body);
    Task.updatePriority(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateStatus: function (req, res) {
    Task.updateStatus(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateStartDate: function (req, res) {
    Task.updateStartDate(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateEndDate: function (req, res) {
    Task.updateEndDate(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAllAssignees: function (req, res) {
    Task.getAllAssingees(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  delete: function (req, res) {
    Task.deleteTask(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
