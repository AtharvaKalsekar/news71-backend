import colors from 'colors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import Article from './models/article.js';

const _ = colors;

dotenv.config();
connectDB();

const importData = async () => {
  try {
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
    const availableNews = news.filter((resp) => resp.status === "OK");
    let availableArticles = [];
    availableNews.forEach((resp) => {
      availableArticles = availableArticles.concat(resp.results);
    });

    for (let article of availableArticles) {
      const doesArticleExists = await Article.exists({ uri: article.uri });
      if (!doesArticleExists) {
        const _article = new Article(article);
        await _article.save();
      }
    }
    console.log("data imported !!".green.inverse);
    process.exit();
  } catch (e) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
