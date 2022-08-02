const Message = require("../model/Message");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    Message.create(req.body, req.params.project, req.member, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  create2: async function (req, res) {
    try {
      return res.json(await Message.create(req.body, req.params.project, req.member));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  // register new user
  getAll: function (req, res) {
    Message.find(req.params.project, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  addVote: function (req, res) {
    Message.addVote(req.params.optionId, req.member, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteVote: function (req, res) {
    Message.deleteVote(req.params.optionId, req.member, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  sendReply: function (req, res) {
    Message.sendReply(req.body, req.member, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAllReplies: function (req, res) {
    Message.getAll(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
