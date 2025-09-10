import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import mongoose from 'mongoose';
import { OtpService } from '../services/otp.service';
import { sendOtpMail } from '../utils/email.util';

const userService = new UserService();
const otpService = new OtpService();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    userService.getAll().then(arr => arr.slice(skip, skip + limit)),
    userService.getAll().then(arr => arr.length)
  ]);

  res.json({ total, page, limit, users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@') || !data.email.trim()) {
    return res.status(400).json({ message: 'Email không hợp lệ' });
  }
  // Kiểm tra email đã tồn tại với cùng role chưa
  const existed = await (await import('../models/user.model')).default.findOne({ email: data.email, role: data.role });
  if (existed) {
    return res.status(400).json({ message: 'Email này đã được đăng ký với vai trò này.' });
  }
  const user = await userService.create(data);
  const userId = (user as any)._id.toString();

  // Sinh và gửi OTP
  const otp = generateOtp();
  const expires_at = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
  await otpService.deleteByUser(userId);
  await otpService.create(userId, otp, expires_at);
  await sendOtpMail({
    to: user.email,
    title: 'Xác thực OTP',
    name: user.name,
    description: 'Bạn vừa đăng ký tài khoản. Vui lòng sử dụng mã bên dưới để xác thực tài khoản.',
    otp,
    companyName: 'Library System'
  });

  res.status(201).json({
    user,
    message: 'Tạo người dùng thành công. Đã gửi mã OTP về email.'
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  const data = req.body;
  const user = await userService.update(id, data);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  const user = await userService.delete(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Xóa thành công' });
}; 