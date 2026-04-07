import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, fromd: true },
  username: { type: String, fromd: true, unique: true },
  password: { type: String, fromd: true },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

export { User };
