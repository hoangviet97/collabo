const Joi = require("joi");

const projectValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    color: Joi.string().optional(),
    description: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.projectValidation = projectValidation;
