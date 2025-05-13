// backend/controllers/auth.controller.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

// ✅ Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, country, avatar } = req.body; // ✅ include avatar

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      country,
      avatar: avatar || "" // ✅ store avatar if provided
    });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ message: "Signup Successful", token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


// ✅ Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong Password" });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: "Login Successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ✅ Google Login Controller
export const googleLogin = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    if (!email || !name) return res.status(400).json({ message: "Missing email or name" });

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashed = await bcrypt.hash(randomPassword, 10);
      user = await User.create({
        name,
        email,
        password: hashed,
        avatar: avatar || '',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Google login failed:", err);
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
};
