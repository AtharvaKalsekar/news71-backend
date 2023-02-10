import express from 'express';

import { getArticles } from '../controllers/article.js';

const router = express.Router();

router.route("/").get(getArticles);

export default router;
