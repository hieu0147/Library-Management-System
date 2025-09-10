import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  category_ids: mongoose.Types.ObjectId[];
  created_at: Date;
}

const BookSchema: Schema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  category_ids: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IBook>('Book', BookSchema); 