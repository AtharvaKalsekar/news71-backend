import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/fetchLatestNews", async (req, res, next) => {
  const sections = {
    ARTS: "arts",
    AUTOMOBILES: "automobiles",
    BOOKS: "books",
    BUSINESS: "business",
    FASHINON: "fashion",
    FOOD: "food",
    HEALTH: "health",
    HOME: "home",
    INSIDER: "insider",
    MAGAZINE: "magazine",
    MOVIES: "movies",
    NY_REGION: "nyregion",
    OBITUARIES: "obituaries",
    OPINION: "opinion",
    POLITICS: "politics",
    REAL_ESTATE: "realestate",
    SCIENCE: "science",
    SPORTS: "sports",
    SUNDAY_REVIEW: "sundayreview",
    TECHNOLOGY: "technology",
    THEATER: "theater",
    T_MAGAZINE: "t-magazine",
    TRAVEL: "travel",
    UPSHOT: "upshot",
    US: "us",
    WORLD: "world",
  };

  const news = await Promise.all(
    Object.entries(sections).map(async ([key, section]) => {
      const data = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=edTOGyAP76XdAxaKwbnD9IqL8mpxbAXn`
      ).then((resp) => resp.json());
      return data;
    })
  );
  res.status(200);
  res.send({ news });
});

app.listen(process.env.PORT);
