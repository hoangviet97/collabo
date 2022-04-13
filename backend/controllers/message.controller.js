const Message = require("../model/Message");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    Message.create(req.body, req.member, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  // register new user
  getAll: function (req, res) {
    Message.find(req.body.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  addVote: function (req, res) {
    Message.addVote(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  deleteVote: function (req, res) {
    Message.deleteVote(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
