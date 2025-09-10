import { Request, Response } from 'express';
import * as borrowService from '../services/borrow.service';
import { BorrowBookDto, ReturnBookDto } from '../dtos/borrowRecord.dto';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const record = await borrowService.borrowBook(req.body as BorrowBookDto);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: 'Mượn sách thất bại', error: err });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const record = await borrowService.returnBook(req.params.id, req.body as ReturnBookDto);
    if (!record) return res.status(404).json({ message: 'Không tìm thấy record' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: 'Trả sách thất bại', error: err });
  }
};

export const getBorrowRecordsByUser = async (req: Request, res: Response) => {
  try {
    const records = await borrowService.getBorrowRecordsByUser(req.params.user_id);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Lấy lịch sử mượn thất bại', error: err });
  }
};

export const getAllBorrowRecords = async (req: Request, res: Response) => {
  try {
    const records = await borrowService.getAllBorrowRecords();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Lấy tất cả borrow record thất bại', error: err });
  }
};

// API báo cáo danh sách sách đang được mượn
export const getCurrentlyBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const records = await borrowService.getCurrentlyBorrowedBooks();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Lấy danh sách sách đang được mượn thất bại', error: err });
  }
};

// API báo cáo danh sách sách đang được mượn có phân trang
export const getCurrentlyBorrowedBooksPaginated = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const result = await borrowService.getCurrentlyBorrowedBooksPaginated(page, limit);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Lấy danh sách sách đang được mượn (phân trang) thất bại', error: err });
  }
}; 