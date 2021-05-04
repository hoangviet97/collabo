const Joi = require("joi");

const taskValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.taskValidation = taskValidation;
