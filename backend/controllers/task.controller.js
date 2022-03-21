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
    Task.getAllTasks(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll2: function (req, res) {
    Task.getAllTasks2(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAllLimit: function (req, res) {
    Task.getAllTasksWithLimit(req.params.id, req.params.limit, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getByStatus: function (req, res) {
    Task.getTasksByStatus(req.body.id, req.body.status, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getStatusGroup: function (req, res) {
    Task.getStatusGroup(req.body.id, (err, result) => {
      console.log(result);
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

  getAssigneesByStatus: function (req, res) {
    Task.getAssingeesByStatus(req.body.id, req.body.status, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  createAssignee: function (req, res) {
    Task.addAssignee(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteAssignee: function (req, res) {
    Task.deleteAssignee(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  delete: function (req, res) {
    Task.deleteTask(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  setBudget: function (req, res) {
    Task.setBudget(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  setProgress: function (req, res) {
    Task.setProgress(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
