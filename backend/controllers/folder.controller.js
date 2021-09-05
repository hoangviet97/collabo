const Folder = require("../model/Folder");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: function (req, res) {
    Folder.create(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    Folder.find(req.body.project_id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};