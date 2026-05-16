import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { oauth2Client } from "../utils/googleClient.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      return res
        .status(200)
        .json({ message: "logged in successfully" }, { token: token });
    }
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered" });
  } catch (err) {
    res.json({ message: `Something went wrong ${err}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("1. Code received from frontend:", code);

    if (!code) {
      return res.status(400).json({ message: "Code parameter is missing" });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const googleUserResponse = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`,
    );
    const googleUser = await googleUserResponse.json();
    console.log("4. Google user profile parsed:", googleUser.email);

    let user = await User.findOne({ username: googleUser.email });

    if (!user) {
      console.log("5. New user! Saving to database...");
      user = new User({
        name: googleUser.name,
        username: googleUser.email,
        password: Math.random().toString(36).slice(-8),
        image: googleUser.picture,
      });
      await user.save();
    } else {
      console.log("5. Existing user found in database.");
    }

    const appToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    user.token = appToken;
    await user.save();

    return res.status(200).json({
      message: "Success",
      token: appToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      errorDetails: error.message,
    });
  }
};

export { login, register };
