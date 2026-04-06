const { Server } = require("socket.io");

let connections = {};

export const connectToSocket = (server) => {
  const io = new Server(server);
  return io;
};
