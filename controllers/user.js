import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

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
    throw new Error("User not registered");
  }

  if (user.password !== password) {
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
    throw new Error("Insufficient credentials");
  }

  const userExists = await User.exists({ email });

  if (userExists) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  res.status(200).json({
    id: user._id,
    email: user.email,
    name: user.name,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "30d",
    }),
  });
});
