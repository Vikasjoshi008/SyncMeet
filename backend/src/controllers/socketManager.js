import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    let path;

    // Join room
    socket.on("join-call", (roomPath) => {
      path = roomPath;

      if (connections[path] === undefined) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify all users
      for (let i = 0; i < connections[path].length; i++) {
        io.to(connections[path][i]).emit(
          "user-joined",
          socket.id,
          connections[path],
        );
      }

      // Send previous messages
      if (messages[path] !== undefined) {
        for (let i = 0; i < messages[path].length; i++) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][i].data,
            messages[path][i].sender,
            messages[path][i]["socket-id-sender"],
          );
        }
      }
    });

    // Signal event
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    // Chat message event
    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false],
      );

      if (found) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender,
          data,
          "socket-id-sender": socket.id,
        });

        console.log("message:", matchingRoom, sender, data);

        connections[matchingRoom].forEach((element) => {
          io.to(element).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      let key;

      for (const [k, v] of Object.entries(connections)) {
        if (v.includes(socket.id)) {
          key = k;

          connections[key].forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          connections[key] = connections[key].filter((id) => id !== socket.id);

          if (connections[key].length === 0) {
            delete connections[key];
          }

          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};

export { connectToSocket };
