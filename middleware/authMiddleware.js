import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const protect = asyncHandler(
  /**
   * @type {Controller<{user?:TMongooseModel<TUserModel>}>}
   */
  async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new Error("Not authorized, token failed");
    }
    const token = req.headers.authorization;
    /** @type {any} */
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  }
);

export const isEmailVerified = asyncHandler(
  /**
   * @type {Controller<{user?:TMongooseModel<TUserModel>}>}
   */
  async (req, res, next) => {
    const user = req.user;
    if (!user?.isEmailVerified) {
      throw new Error("Email ID not verified");
    }
    next();
  }
);
