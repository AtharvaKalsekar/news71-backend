const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.listen(4000);
