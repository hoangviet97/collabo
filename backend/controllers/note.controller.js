const Note = require("../model/Note");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new projects
  create: async function (req, res) {
    try {
      return res.json(await Note.create(req.params.session, req.body.text));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  getNote: async function (req, res) {
    try {
      return res.json(await Note.find(req.params.session));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },

  update: async function (req, res) {
    try {
      return res.json(await Note.update(req.params.id, req.body.text));
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
};
