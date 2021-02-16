const Project = require("../model/Project");
const Member = require("../model/Member");
const { projectValidation } = require("../validation/project");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  create: function (req, res) {
    const { error } = projectValidation(req.body);

    if (error) apiResponse.validationErrorWithData(res, error.message, error);

    Project.createProject(req.body, (err, result) => {
      if (err) apiResponse.ErrorResponse(res, err.message);

      Member.createMember(req.user.id, result, (err, resu) => {
        if (err) apiResponse.ErrorResponse(res, err.message);

        res.json(resu);
      });
    });
  }
};
