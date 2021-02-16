const Member = require("../model/Member");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  create: function (req, res) {
    Member.createMember(req.body, (err, result) => {
      if (err) apiResponse.ErrorResponse(res, err.message);
      res.json(result);
    });
  }
};
