const Joi = require("joi");

const talkingPointValidation = (data) => {
  const schema = Joi.object({
    session_id: Joi.string().required(),
    text: Joi.string().required(),
    checked: Joi.date().optional()
  });
  return schema.validate(data);
};

module.exports.talkingPointValidation = talkingPointValidation;
