const Invitation = require("../model/Invitation");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    Invitation.create(req.body.receiver_email, req.user.id, req.params.project, (err, result) => {
      if (err) {
        console.log(err);
        return apiResponse.ErrorResponse(res, err);
      }
      return res.json(result);
    });
  },

  create2: async function (req, res) {
    try {
      return res.json(await Invitation.create2(req.body.receiver_email, req.user.id, req.params.project));
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(err.message);
    }
  },

  accept: async function (req, res) {
    try {
      return res.json(await Invitation.accept(req.params.id, req.user.id, req.params.project));
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  // get all project invitations
  getAll: async function (req, res) {
    try {
      return res.json(await Invitation.findAll(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAllPrivate: async function (req, res) {
    try {
      return res.json(await Invitation.find(req.user.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  updateSeenStatus: async function (req, res) {
    try {
      return res.json(await Invitation.updateSeenStatus(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    try {
      return res.json(await Invitation.deleteInvitation(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
