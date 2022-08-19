import express from 'express';
const router = express.Router();
import authenticateUser from '../middleware/authentication.js';
import { login, register, updateUser } from '../controllers/auth.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/updateuser', authenticateUser, updateUser);

export default router;
