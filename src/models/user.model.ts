import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    is_verified: boolean;
    created_at: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  is_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema); 