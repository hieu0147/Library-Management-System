import BorrowRecord, { IBorrowRecord } from '../models/borrowRecord.model';
import { BorrowBookDto, ReturnBookDto } from '../dtos/borrowRecord.dto';
import { Types } from 'mongoose';

export const borrowBook = async (data: BorrowBookDto): Promise<IBorrowRecord> => {
  return BorrowRecord.create({ ...data, borrowed_at: new Date(), returned_at: null });
};

export const returnBook = async (id: string, data: ReturnBookDto): Promise<IBorrowRecord | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return BorrowRecord.findByIdAndUpdate(id, { returned_at: data.returned_at }, { new: true });
};

export const getBorrowRecordsByUser = async (user_id: string): Promise<IBorrowRecord[]> => {
  if (!Types.ObjectId.isValid(user_id)) return [];
  return BorrowRecord.find({ user_id }).populate('book_id');
};

export const getAllBorrowRecords = async (): Promise<IBorrowRecord[]> => {
  return BorrowRecord.find().populate('user_id').populate('book_id');
};

// Lấy danh sách sách đang được mượn (chưa trả)
export const getCurrentlyBorrowedBooks = async (): Promise<IBorrowRecord[]> => {
  return BorrowRecord.find({ returned_at: null }).populate('user_id').populate('book_id');
};

// Lấy danh sách sách đang được mượn (chưa trả) có phân trang
export const getCurrentlyBorrowedBooksPaginated = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [records, total] = await Promise.all([
    BorrowRecord.find({ returned_at: null })
      .populate('user_id')
      .populate('book_id')
      .skip(skip)
      .limit(limit),
    BorrowRecord.countDocuments({ returned_at: null })
  ]);
  return {
    records,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}; 