import { Router } from 'express';
import * as borrowController from '../controllers/borrow.controller';
import { borrowBookSchema, returnBookSchema } from '../validations/borrowRecord.validation';
import validate from '../middlewares/validate.middleware';

const router = Router();

router.post('/borrow', validate(borrowBookSchema), borrowController.borrowBook);
router.put('/return/:id', validate(returnBookSchema), borrowController.returnBook);
router.get('/user/:user_id', borrowController.getBorrowRecordsByUser);
router.get('/', borrowController.getAllBorrowRecords);
router.get('/report/currently-borrowed', borrowController.getCurrentlyBorrowedBooks);
router.get('/report/currently-borrowed/paginate', borrowController.getCurrentlyBorrowedBooksPaginated);

export default router; 