const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ENV } = require("./config/environment");
const connect = require("./database/connect");
const errorHandling = require("./middlewares/errorHandling");

// router
const users = require("./router/usersRoute");
const classes = require("./router/classesRoute");
const subjects = require("./router/subjectsRoute");
const chapters = require("./router/chapterRoute");
const quizes = require("./router/quizRoute");
const theories = require("./router/theoryRoute");

const START_SERVER = () => {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/users", users);
  app.use("/api/classes", classes);
  app.use("/api/subjects", subjects);
  app.use("/api/chapters", chapters);
  app.use("/api/quizes", quizes);
  app.use("/api/theories", theories);

  // Middlewares
  app.use(errorHandling);

  app.listen(ENV.PORT, () => {
    console.log(`Server connected to http://localhost:${ENV.PORT}`);
  });
};

// IIFE
(async () => {
  try {
    await connect.CONNECT_DB();
    console.log("Connect to MongoDB");

    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
