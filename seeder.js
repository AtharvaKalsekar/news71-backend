import colors from "colors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Article from "./models/article.js";

const _ = colors;

const Sections = [
  "arts",
  "automobiles",
  "books/review",
  "business",
  "fashion",
  "food",
  "health",
  "home",
  "insider",
  "magazine",
  "movies",
  "nyregion",
  "obituaries",
  "opinion",
  "politics",
  "realestate",
  "science",
  "sports",
  "sundayreview",
  "technology",
  "theater",
  "t-magazine",
  "travel",
  "upshot",
  "us",
  "world",
];

dotenv.config();
connectDB();

const importData = async () => {
  try {
    const news = [];

    const queue = Sections.map((section) => async () => {
      const data = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=edTOGyAP76XdAxaKwbnD9IqL8mpxbAXn`
      )
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
      return data;
    });

    const interval = setInterval(async () => {
      if (queue.length) {
        const task = queue.shift();
        const result = await task?.();
        news.push(result);
      } else {
        clearInterval(interval);
        const availableNews = news.filter((resp) => resp.status === "OK");
        let availableArticles = [];
        console.log(
          `Available news items = ${availableNews.length}`.blue.inverse
        );
        availableNews.forEach((resp) => {
          availableArticles = availableArticles.concat(resp.results);
        });

        console.log(
          `Available articles items = ${availableArticles.length}`.blue.inverse
        );

        for (let article of availableArticles) {
          const doesArticleExists = await Article.exists({ uri: article.uri });
          if (!doesArticleExists) {
            const _article = new Article(article);
            await _article.save();
          }
        }
        console.log("data imported !!".green.inverse);
        process.exit();
      }
    }, 30000);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
