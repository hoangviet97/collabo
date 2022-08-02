const Joi = require("joi");

const sectionValidation = (data) => {
  const schema = Joi.object({
    project_id: Joi.string().required(),
    name: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports.sectionValidation = sectionValidation;
