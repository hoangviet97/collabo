const Joi = require("joi");

const folderValidation = (data) => {
  const schema = Joi.object({
    project_id: Joi.string().required(),
    name: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.folderValidation = folderValidation;
