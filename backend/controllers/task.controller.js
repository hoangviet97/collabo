const Task = require("../model/Task");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: function (req, res) {
    Task.createTask(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      if (result !== null) {
        Task.createTaskAssignees(result, (err, resu) => {
          if (err) return apiResponse.ErrorResponse(res, err.message);
          return res.json(resu);
        });
      } else {
        return res.json(result);
      }
    });
  },

  getAll: function (req, res) {
    Task.getAllTasks(req.body.id, (err, result) => {
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