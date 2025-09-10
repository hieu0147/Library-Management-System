import { Router } from 'express';
import { sendOtp, verifyOtp } from '../controllers/otp.controller';

const router = Router();

router.post('/users/:id/send-otp', sendOtp);
router.post('/users/:id/verify-otp', verifyOtp);

export default router; 