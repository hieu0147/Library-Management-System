import mongoose, { Document, Schema } from 'mongoose';

export interface IOtp extends Document {
    user_id: mongoose.Types.ObjectId;
    otp: string;
    expires_at: Date;
}

const OtpSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  expires_at: { type: Date, required: true }
});

export default mongoose.model<IOtp>('Otp', OtpSchema); 