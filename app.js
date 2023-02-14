import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import ArticleRouter from './routes/article.js';
import UserRouter from './routes/user.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.use("/articles", ArticleRouter);
app.use("/auth", UserRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`.green.inverse);
});
