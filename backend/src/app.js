import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

const start = async () => {
  const connectDb = await mongoose.connect(process.env.MONGO_URI);
  if (connectDb) {
    console.log("connected to database");
  }
  server.listen(app.get("port"), () => {
    console.log("server is running on port 8000");
  });
};
start();
