import RedisStore from "connect-redis";
import { createClient } from "redis";
require("dotenv").config();
import express from "express";
import path from "path";
import session, { MemoryStore } from "express-session";
import morgan from "morgan";

module.exports = (app) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("tiny"));
  let redisClient = createClient({
    url: `redis://jerryfan:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  });

  console.log("hit here", process.env.NODE_ENV);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  });

  // Create a redis client instance
  if (process.env.NODE_ENV === "production") {
    console.log("hiiiit");
    app.use(
      session({
        store: redisStore,
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        },
      })
    );
  } else {
    // Session Configuration
    app.use(
      session({
        store: new MemoryStore(),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        },
      })
    );
  }
};
