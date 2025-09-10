import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';
import validate from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/paginate', bookController.getBooksPaginated);
router.post('/', authMiddleware, validate(createBookSchema), bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', authMiddleware, validate(updateBookSchema), bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

export default router; 