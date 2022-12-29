const Joi = require("joi");

const sessionValidation = (data) => {
  const schema = Joi.object({
    project_id: Joi.string().required(),
    name: Joi.string().required(),
    date: Joi.date().required(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    description: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.sessionValidation = sessionValidation;
