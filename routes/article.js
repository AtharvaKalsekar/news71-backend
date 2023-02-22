import express from 'express';

import { getArticleById, getArticles } from '../controllers/article.js';
import { isEmailVerified, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(protect, isEmailVerified, getArticles);
router.route("/:id").get(protect, isEmailVerified, getArticleById);

export default router;
