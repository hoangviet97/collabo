const Joi = require("joi");

const invitationValidation = (data) => {
  const schema = Joi.object({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    project_id: Joi.string().required(),
    seen: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports.invitationValidation = invitationValidation;
