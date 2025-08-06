import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Generate JWT token
const generateToken = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// Register Admin (only for setup/testing)
export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  const exists = await Admin.findOne({ username });
  if (exists) return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ username, password });

  generateToken(res, admin._id);

  res.status(201).json({ message: "Admin registered successfully" });
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  generateToken(res, admin._id);

  res.json({ message: "Login successful" });
};

// Logout
export const logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
