const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { corsOptions } = require("./config/cors");
const { ENV } = require("./config/environment");
const connect = require("./database/connect");
const requireAuth = require("./middlewares/requireAuth");
const errorHandling = require("./middlewares/errorHandling");
// const http = require("http");
// const configureSocket = require("./sockets/socket");
const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3002",
  },
});

// router
const users = require("./router/usersRoute");
const data = require("./router/dataRoute");
const chat = require("./router/chatRoute");

const classes = require("./router/classesRoute");
const subjects = require("./router/subjectsRoute");
const chapters = require("./router/chapterRoute");
const quizes = require("./router/quizRoute");
const theories = require("./router/theoryRoute");
const test = require("./router/testRoute");
const auth = require("./router/authRoute");

const START_SERVER = () => {
  const app = express();
  // const server = http.createServer(app);
  // const io = configureSocket(server);

  let us = [];
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("addUser", (userId) => {
      console.log("userID", userId);
      // const isUserExist = users.find(user => user.userId === userId);
      // if (!isUserExist) {
      //     const user = { userId, socketId: socket.id };
      //     users.push(user);
      //     io.emit('getUsers', users);
      // }
    });
  });

  app.use(morgan("tiny"));
  app.use(cors());
  // app.use(cors(corsOptions));
  app.use(express.json());

  // Middlewares authorization
  app.use("/api/auth", auth);
  app.use(requireAuth);

  // Routes
  app.use("/api/v1/data", data);
  app.use("/api/users", users);
  app.use("/api/chat", chat);

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
