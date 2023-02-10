import colors from 'colors';
import asyncHandler from 'express-async-handler';

import { SECTION } from '../constants.js';
import Article from '../models/article.js';

const _ = colors;

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const getArticles = asyncHandler(async (req, res, next) => {
  try {
    const section = req.query.section ?? SECTION.HOME;
    const articlesPerSection = Number(req.query.articlesPerSection) ?? 10;
    const articles = await Article.find({
      section,
    }).limit(articlesPerSection);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500);
    console.log("Error while getting articles", `${error}`.red.inverse);
  }
});
