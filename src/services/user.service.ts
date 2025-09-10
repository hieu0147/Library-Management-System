import User, { IUser } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import bcrypt from 'bcrypt';

export class UserService {
  async getAll(): Promise<IUser[]> {
    return User.find();
  }

  async getById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async create(data: CreateUserDto): Promise<IUser> {
    // Hash mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    return user.save();
  }

  async update(id: string, data: UpdateUserDto): Promise<IUser | null> {
    // Nếu có password mới thì hash trước khi update
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
} 