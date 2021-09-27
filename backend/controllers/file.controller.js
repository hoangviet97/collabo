const File = require("../model/File");
const apiResponse = require("../helpers/apiResponse");
const path = require("path");

module.exports = {
  // register new user
  upload: function (req, res) {
    console.log(req.file);
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
  },

  download: function (req, res) {
    File.download(req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);

      res.set({
        "Content-Type": result.file_mimetype
      });
      res.sendFile(path.join(__dirname, "..", result.file_path));
    });
  },

  moveToFolder: function (req, res) {
    File.addFolder(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
