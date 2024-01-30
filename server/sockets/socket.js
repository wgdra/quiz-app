const { Server } = require("socket.io");
const userModel = require("../models/userModel");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("addUser", (userId) => {
      console.log("userID", userId);
      const isUserExist = users.find((user) => user.userId === userId);
      if (!isUserExist) {
        const user = { userId, socketId: socket.id };
        users.push(user);
        io.emit("getUsers", users);
      }
    });

    socket.on(
      "sendMessage",
      async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find((user) => user.userId === receiverId);
        const sender = users.find((user) => user.userId === senderId);
        //   const user = await Users.findById(senderId);
        const user = await userModel.getOneUser(senderId);
        console.log("sender :>> ", sender, receiver);
        if (receiver) {
          io.to(receiver.socketId)
            .to(sender.socketId)
            .emit("getMessage", {
              conversationId,
              senderId,
              receiverId,
              message,
              user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email,
              },
            });
        } else {
          io.to(sender.socketId).emit("getMessage", {
            conversationId,
            senderId,
            receiverId,
            message,
            user: {
              id: user._id,
              full_name: user.full_name,
              email: user.email,
            },
          });
        }
      }
    );

    socket.on("disconnect", () => {
      users = users.filter((user) => user.socketId !== socket.id);
      io.emit("getUsers", users);
    });
  });

  return io;
};

module.exports = configureSocket;
