/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};
