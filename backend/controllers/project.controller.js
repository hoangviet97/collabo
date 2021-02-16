const Project = require("../model/Project");
const { projectValidation } = require("../validation/project");

module.exports = {
  create: function (req, res) {
    const { error } = projectValidation(req.body);

    if (error) {
      return res.status(500).json({
        message: error || "Some error occurred while creating a new project."
      });
    }

    Project.createProject(req.body, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err || err.message || "Some error occurred while creating a new project."
        });
      } else {
        res.json(result);
      }
    });
  }
};
