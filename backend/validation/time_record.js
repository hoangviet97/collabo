const Joi = require("joi");

const timerValidation = (data) => {
  const schema = Joi.object({
    start: Joi.date().required(),
    end: Joi.date().required(),
    task_id: Joi.string().optional(),
    user_id: Joi.string().optional(),
    total: Joi.number().optional(),
    description: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.timerValidation = timerValidation;
