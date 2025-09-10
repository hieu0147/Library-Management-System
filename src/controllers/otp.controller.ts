import { Request, Response } from 'express';
import { OtpService } from '../services/otp.service';
import { UserService } from '../services/user.service';
import { sendOtpMail } from '../utils/email.util';
import User from '../models/user.model';

const otpService = new OtpService();
const userService = new UserService();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendOtp = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.email) {
    return res.status(400).json({ message: 'User chưa có email để gửi OTP' });
  }

  // Xóa OTP cũ nếu có
  await otpService.deleteByUser(id);

  const otp = generateOtp();
  const expires_at = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
  await otpService.create(id, otp, expires_at);

  await sendOtpMail({
    to: user.email,
    title: 'Xác thực OTP',
    name: user.name,
    description: 'Bạn vừa yêu cầu mã xác thực OTP. Vui lòng sử dụng mã bên dưới để xác thực tài khoản.',
    otp,
    companyName: 'Library System'
  });

  res.json({ message: 'Đã gửi OTP về email' });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { otp } = req.body;
  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const validOtp = await otpService.findValidOtp(id, otp);
  if (!validOtp) return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn' });

  // Cập nhật user đã xác thực
  await User.findByIdAndUpdate(id, { is_verified: true });
  await otpService.deleteByUser(id);

  res.json({ message: 'Xác thực OTP thành công' });
}; 