import express from 'express';

import { login, register, resendOtp, verifyOtp } from '../controllers/user.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyOtp").post(protect, verifyOtp);
router.route("/resendOtp").post(protect, resendOtp);

export default router;
