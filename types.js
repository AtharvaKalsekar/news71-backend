/**
 * @template T
 * @typedef { (import("mongoose").Document<unknown, any, T> & T) } TMongooseModel<T>
 */

/**
 * @typedef {{
 *    name?: string | undefined;
 *    password?: string | undefined;
 *    email?: string | undefined;
 *    verificationOtp?: number | undefined;
 *    otpGeneratedAt?: Date | undefined;
 *    isEmailVerified?: boolean | undefined;
 * }} TUserModel
 */

/** @typedef {import("express").Request} TRequest */
/** @typedef {import("express").Response} TResponse */
/** @typedef {import("express").NextFunction} TNextFunction */

/**
 * @template T
 * @typedef {(
 *   req: TRequest & T,
 *   res:TResponse,
 *   next:TNextFunction
 *  ) => any } Controller<T>
 */

export default {};
