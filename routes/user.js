import express from "express";

import {
  checkEmailExists,
  login,
  register,
  resendOtp,
  setNewPassword,
  verifyOtp,
} from "../controllers/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyOtp").post(protect, verifyOtp);
router.route("/resendOtp").post(protect, resendOtp);
router.route("/checkEmailExists").post(checkEmailExists);
router.route("/setNewPassword").post(protect, setNewPassword);

export default router;
