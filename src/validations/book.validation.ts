import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  category_ids: Joi.array().items(Joi.string().hex().length(24)).required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  description: Joi.string(),
  category_ids: Joi.array().items(Joi.string().hex().length(24)),
}); 