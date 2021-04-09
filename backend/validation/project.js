const Joi = require("joi");

const projectValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.projectValidation = projectValidation;
