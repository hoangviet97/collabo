const File = require("../model/File");
const apiResponse = require("../helpers/apiResponse");
const path = require("path");
const aws = require("aws-sdk");
require("dotenv").config();

module.exports = {
  // register new user
  upload: function (req, res) {
    File.upload2(req.params.project, req.body, req.file, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err);
      return res.json(result);
    });
  },

  getAll: async function (req, res) {
    try {
      return res.json(await File.find(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getFileTypes: async function (req, res) {
    try {
      return res.json(await File.findTypes(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAllByFolder: async function (req, res) {
    try {
      return res.json(await File.findByFolder(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  download: function (req, res) {
    const s3 = new aws.S3({
      region: "eu-central-1",
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });

    res.attachment("7ea8761c-6adf-4b10-833b-28448328e99f");

    s3.getObject({
      Bucket: "collabo-files",
      Key: req.params.id
    })
      .createReadStream()
      .pipe(res);
  },

  moveToFolder: async function (req, res) {
    try {
      return res.json(await File.addFolder(req.body.folder_id, req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    File.delete(req.params.id, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
