import Book, { IBook } from '../models/book.model';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';
import { Types } from 'mongoose';

export const createBook = async (data: CreateBookDto): Promise<IBook> => {
  return Book.create(data);
};

export const getAllBooks = async (): Promise<IBook[]> => {
  return Book.find().populate('category_ids');
};

export const getBookById = async (id: string): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Book.findById(id).populate('category_ids');
};

export const updateBook = async (id: string, data: UpdateBookDto): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Book.findByIdAndUpdate(id, data, { new: true }).populate('category_ids');
};

export const deleteBook = async (id: string): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Book.findByIdAndDelete(id);
};

export const getBooksPaginated = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const [books, total] = await Promise.all([
    Book.find().skip(skip).limit(limit).populate('category_ids'),
    Book.countDocuments()
  ]);
  const totalPages = Math.ceil(total / limit);
  return { books, total, totalPages, page, limit };
}; 