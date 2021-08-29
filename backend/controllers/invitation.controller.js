const Invitation = require("../model/Invitation");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    console.log(req.body.receiver_email);
    Invitation.create(req.body, req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err);

      //req.app.get("io").emit("test2", req.user.id);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    Invitation.findAll(req.body.project, (err, result) => {
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
    Invitation.updateSeenStatus(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
