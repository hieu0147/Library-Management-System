import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.createBook(req.body as CreateBookDto);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: 'Tạo sách thất bại', error: err });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Lấy danh sách sách thất bại', error: err });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Lấy sách thất bại', error: err });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body as UpdateBookDto);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Cập nhật sách thất bại', error: err });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json({ message: 'Xóa sách thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Xóa sách thất bại', error: err });
  }
};

export const getBooksPaginated = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const result = await bookService.getBooksPaginated(page, limit);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Lấy danh sách sách thất bại', error: err });
  }
}; 