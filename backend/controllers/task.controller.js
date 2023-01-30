const Task = require("../model/Task");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Task.create(req.body.task));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Task.getAllTasks(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getOne: async function (req, res) {
    try {
      return res.json(await Task.getOne(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getPersonal: async function (req, res) {
    try {
      return res.json(await Task.getPersonalTasks(req.params.project, req.params.member));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getPersonalUser: async function (req, res) {
    try {
      return res.json(await Task.getPersonalUserTasks(req.params.project, req.params.user));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getStatusGroup: async function (req, res) {
    try {
      return res.json(await Task.getStatusGroup(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updatePriority: async function (req, res) {
    try {
      return res.json(await Task.updatePriority(req.body.priorityId, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateStatus: async function (req, res) {
    try {
      return res.json(await Task.updateStatus(req.body.statusId, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateStartDate: async function (req, res) {
    try {
      return res.json(await Task.updateStartDate(req.body.date, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateEndDate: async function (req, res) {
    try {
      return res.json(await Task.updateEndDate(req.body.date, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAllAssignees: async function (req, res) {
    try {
      return res.json(await Task.getAllAssingees(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAssigneeTasks: async function (req, res) {
    try {
      return res.json(await Task.getAssingeeTasks(req.params.project, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  createAssignee: async function (req, res) {
    Task.addAssignee(req.params.userId, req.member, req.params.id, req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteAssignee: async function (req, res) {
    try {
      return res.json(await Task.deleteAssignee(req.params.assigneeId, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    try {
      return res.json(await Task.deleteTask(req.params.id));
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  setBudget: async function (req, res) {
    try {
      return res.json(await Task.setBudget(req.body.budget, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  setDescription: async function (req, res) {
    try {
      return res.json(await Task.setDescription(req.body.description, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  setProgress: async function (req, res) {
    try {
      return res.json(await Task.setProgress(req.body.progress, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
