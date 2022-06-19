const Invitation = require("../model/Invitation");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    Invitation.create(req.body.receiver_email, req.user.id, req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err);

      return res.json(result);
    });
  },

  accept: function (req, res) {
    Invitation.accept(req.params.id, req.user.id, req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    Invitation.findAll(req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAllPrivate: function (req, res) {
    Invitation.find(req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateSeenStatus: function (req, res) {
    Invitation.updateSeenStatus(req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  delete: function (req, res) {
    Invitation.deleteInvitation(req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
