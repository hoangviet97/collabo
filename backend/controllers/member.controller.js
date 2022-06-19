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

  getAll: function (req, res) {
    Member.find(req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll2: function (req, res) {
    Member.findAll((err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateRole: function (req, res) {
    Member.updateRole(req.body.role_id, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteMember: function (req, res) {
    Member.delete(req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  leave: function (req, res) {
    Member.leave(req.params.project, req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
