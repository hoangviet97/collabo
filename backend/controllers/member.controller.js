const Member = require("../model/Member");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new project member
  create: async function (req, res) {
    try {
      return res.json(await Member.create(req.user.id, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Member.find(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll2: function (req, res) {
    Member.findAll(req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateRole: async function (req, res) {
    try {
      return res.json(await Member.updateRole(req.body.role_id, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  deleteMember: async function (req, res) {
    try {
      return res.json(await Member.delete(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  leave: async function (req, res) {
    try {
      return res.json(await Member.leave(req.params.project, req.user.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
