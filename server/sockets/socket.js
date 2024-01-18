// const { ENV } = require("../config/environment");
const socketIO = require("socket.io");

// (ENV.PORT, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

function configureSocket(server) {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A client has connected", socket.id);

    // Xử lý sự kiện khi có kết nối mới
    socket.on("disconnect", () => {
      console.log("A client has disconnected");
    });

    // Thêm các xử lý sự kiện khác tại đây
  });

  return io;
}

module.exports = configureSocket;
