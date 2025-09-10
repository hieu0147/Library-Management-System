import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrowRecord extends Document {
  user_id: mongoose.Types.ObjectId;
  book_id: mongoose.Types.ObjectId;
  borrowed_at: Date;
  returned_at: Date | null;
}

const BorrowRecordSchema: Schema = new Schema<IBorrowRecord>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowed_at: { type: Date, default: Date.now },
  returned_at: { type: Date, default: null },
});

export default mongoose.model<IBorrowRecord>('BorrowRecord', BorrowRecordSchema); 