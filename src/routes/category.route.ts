import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { createCategorySchema, updateCategorySchema } from '../validations/category.validation';
import validate from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, validate(createCategorySchema), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', authMiddleware, validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

export default router; 