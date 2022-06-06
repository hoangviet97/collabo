const Task = require("../model/Task");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: function (req, res) {
    Task.create(req.body.task, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      return res.json(result);
    });
  },

  getAll: function (req, res) {
    Task.getAllTasks(req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getStatusGroup: function (req, res) {
    Task.getStatusGroup(req.params.project, (err, result) => {
      console.log(result);
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updatePriority: function (req, res) {
    console.log(req.body);
    Task.updatePriority(req.body.priorityId, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateStatus: function (req, res) {
    Task.updateStatus(req.body.statusId, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateStartDate: function (req, res) {
    Task.updateStartDate(req.body.date, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateEndDate: function (req, res) {
    Task.updateEndDate(req.body.date, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAllAssignees: function (req, res) {
    Task.getAllAssingees(req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  createAssignee: function (req, res) {
    Task.addAssignee(req.params.userId, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteAssignee: function (req, res) {
    Task.deleteAssignee(req.params.assigneeId, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  delete: function (req, res) {
    Task.deleteTask(req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  setBudget: function (req, res) {
    Task.setBudget(req.body.budget, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  setDescription: function (req, res) {
    Task.setDescription(req.body.description, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  setProgress: function (req, res) {
    Task.setProgress(req.body.progress, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
