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
  const section = req.query.section ?? SECTION.WORLD;
  const articlesPerSection = Number(req.query.articlesPerSection) ?? 10;
  const articles = await Article.find({
    section,
  }).limit(articlesPerSection);
  res.status(200).json(articles);
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const getArticleById = asyncHandler(async (req, res, next) => {
  const id = req.params.id.trim();
  const article = await Article.findById(id);

  if (!article) {
    throw new Error(`Article not found`);
  }

  res.status(200).json(article);
});
