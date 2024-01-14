const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { corsOptions } = require("./config/cors");
const { ENV } = require("./config/environment");
const connect = require("./database/connect");
const requireAuth = require("./middlewares/requireAuth");
const errorHandling = require("./middlewares/errorHandling");
const checkUserRole = require("./middlewares/roleHandle");

// router
const users = require("./router/usersRoute");
const data = require("./router/dataRoute");
const classes = require("./router/classesRoute");
const subjects = require("./router/subjectsRoute");
const chapters = require("./router/chapterRoute");
const quizes = require("./router/quizRoute");
const theories = require("./router/theoryRoute");
const test = require("./router/testRoute");
const auth = require("./router/authRoute");

const START_SERVER = () => {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  // app.use(cors(corsOptions));
  app.use(express.json());

  app.use("/api/auth", auth);

  // Middlewares authorization
  app.use(requireAuth);

  // Routes
  app.use("/api/v1/data", data);
  app.use("/api/users", users);

  // Middlewares check role
  app.use(checkUserRole);

  // Routes
  app.use("/api/classes", classes);
  app.use("/api/subjects", subjects);
  app.use("/api/chapters", chapters);
  app.use("/api/quizes", quizes);
  app.use("/api/theories", theories);
  app.use("/api/test", test);

  // Middlewares error
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
