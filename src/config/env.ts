import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || '';
export const EMAIL_USER = process.env.EMAIL_USER || '';
export const EMAIL_PASS = process.env.EMAIL_PASS || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000; 