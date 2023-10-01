import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import ArticleRouter from './routes/article.js';
import UserRouter from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.use("/privacy-policy", (req, res, next) => {
  return res.status(200).sendFile(__dirname + `\\privacy-policy.html`);
});

app.use("/articles", ArticleRouter);
app.use("/auth", UserRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${process.env.PORT}`.green.inverse);
});
