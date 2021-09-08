const Member = require("../model/Member");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new project member
  create: function (req, res) {
    Member.create(userId, projectId, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    Member.find(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateRole: function (req, res) {
    Member.updateRole(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteMember: function (req, res) {
    Member.delete(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
