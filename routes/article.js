import express from 'express';

import { getArticleById, getArticles } from '../controllers/article.js';

const router = express.Router();

router.route("/").get(getArticles);
router.route("/:id").get(getArticleById);

export default router;
