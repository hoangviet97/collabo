const Folder = require("../model/Folder");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // register new user
  create: async function (req, res) {
    try {
      return res.json(await Folder.create(req.body.title, req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getOne: async function (req, res) {
    try {
      return res.json(await Folder.findOne(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getAll: async function (req, res) {
    try {
      return res.json(await Folder.find(req.params.project));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  delete: async function (req, res) {
    try {
      return res.json(await Folder.delete(req.params.id));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
