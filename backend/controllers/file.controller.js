const File = require("../model/File");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  upload: function (req, res) {
    const { title, description } = req.body;
    const { path, mimetype } = req.file;

    File.upload(req.body, req.file, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  },

  getAll: function (req, res) {
    File.find(req.body.project_id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
