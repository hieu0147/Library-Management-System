import { body } from 'express-validator';

export const createMemberValidation = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
];

export const updateMemberValidation = [
  body('name').optional().isString().notEmpty().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
]; 