const Timer = require("../model/Timer");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: function (req, res) {
    Timer.create(req.body, req.user.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    Timer.find(req.body.id, "project", (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAllPersonal: function (req, res) {
    Timer.find(req.user.id, "user", (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
