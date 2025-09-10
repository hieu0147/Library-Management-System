import Joi from 'joi';

export const borrowBookSchema = Joi.object({
  user_id: Joi.string().hex().length(24).required(),
  book_id: Joi.string().hex().length(24).required(),
});

export const returnBookSchema = Joi.object({
  returned_at: Joi.date().required(),
}); 