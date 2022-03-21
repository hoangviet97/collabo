const Joi = require("joi");

const fileValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    size: Joi.number().required(),
    file_path: Joi.string().required(),
    file_mimetype: Joi.string().required(),
    project_id: Joi.string().required(),
    folder_id: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.fileValidation = fileValidation;
