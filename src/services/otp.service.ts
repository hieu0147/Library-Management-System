import Otp, { IOtp } from '../models/otp.model';
import mongoose from 'mongoose';

export class OtpService {
  async create(user_id: string, otp: string, expires_at: Date): Promise<IOtp> {
    return Otp.create({ user_id: new mongoose.Types.ObjectId(user_id), otp, expires_at });
  }

  async findValidOtp(user_id: string, otp: string): Promise<IOtp | null> {
    const now = new Date();
    return Otp.findOne({ user_id, otp, expires_at: { $gt: now } });
  }

  async deleteByUser(user_id: string): Promise<void> {
    await Otp.deleteMany({ user_id });
  }
} 