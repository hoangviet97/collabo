const Talking_point = require("../model/Talking_point");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: function (req, res) {
    Talking_point.create(req.body.text, req.params.session, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    console.log(`......${req.app.get("clients")}`);
    Talking_point.find(req.params.session, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  updateCheck: function (req, res) {
    Talking_point.updateCheck(req.body.val, req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
