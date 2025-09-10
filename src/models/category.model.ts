import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
}

const CategorySchema: Schema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

export default mongoose.model<ICategory>('Category', CategorySchema); 