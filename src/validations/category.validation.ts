import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
}); 