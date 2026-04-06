const { Server } = require("socket.io");

let connections = {};

const connectToSocket = (server) => {
  const io = new Server(server);
  return io;
};

module.exports = { connectToSocket };
