import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import { sendOtp } from './utils.js';

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.statusCode = 401;
    throw new Error("User not registered");
  }

  if (user.password !== password) {
    res.statusCode = 401;
    throw new Error("Email id or password incorrect");
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "30d",
    }),
  });
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.statusCode = 401;
    throw new Error("Insufficient credentials");
  }

  const userExists = await User.exists({ email });

  if (userExists) {
    res.statusCode = 409;
    throw new Error("Email already registered");
  }

  const otp = Math.floor(Math.random() * 1000000);
  await sendOtp(otp, email);
  const otpGeneratedAt = new Date();

  const user = await User.create({
    email,
    password,
    name,
    verificationOtp: otp,
    otpGeneratedAt,
  });

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "30d",
    }),
  });
});

export const verifyOtp = asyncHandler(
  /**
   * @type {Controller<{user?:TMongooseModel<TUserModel>}>}
   */
  async (req, res, next) => {
    /**
     * @type { TMongooseModel<TUserModel> | undefined }
     */
    const user = req.user;
    const otp = Number(req.body.otp);

    const otpGeneratedAt = user?.otpGeneratedAt?.getTime() ?? 0;
    const currentDate = new Date().getTime();
    const diff = currentDate - otpGeneratedAt;

    const isOtpExpired =
      Math.round(diff / 1000 / 60) >
      (Number(process.env.OTP_VALIDITY_DURATION_IN_MINUTES) ?? 30);

    if (isOtpExpired) {
      res.statusCode = 410;
      throw new Error("Otp Expired");
    }

    if (user?.verificationOtp !== otp) {
      res.statusCode = 401;
      throw new Error("Otp Incorrect");
    }

    await user?.update({
      isEmailVerified: true,
    });

    res.status(200).json({ message: "Email verified successfully" });
  }
);

export const resendOtp = asyncHandler(
  /**
   * @type {Controller<{user?:TMongooseModel<TUserModel>}>}
   */
  async (req, res, next) => {
    /**
     * @type { TMongooseModel<TUserModel> | undefined }
     */
    const user = req.user;
    const email = user?.email;

    const otp = Math.floor(Math.random() * 1000000);
    await sendOtp(otp, email);
    const otpGeneratedAt = new Date();

    await user?.update({
      verificationOtp: otp,
      otpGeneratedAt,
    });

    res.status(200).json({ message: "OTP sent to registered Email ID" });
  }
);
