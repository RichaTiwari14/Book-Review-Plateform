export const asyncHandler = (fn) => (req, res, next) =>
Promise.resolve(fn(req, res, next)).catch(next);

src/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const genToken = (id) =>
jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const signup = asyncHandler(async (req, res) => {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: "Email already in use" });

const user = await User.create({ name, email, password });
const token = genToken(user._id);
res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user || !(await user.matchPassword(password))) {
return res.status(401).json({ message: "Invalid credentials" });
}
const token = genToken(user._id);
res.json({ user, token });
});

export const me = asyncHandler(async (req, res) => {
const user = await User.findById(req.user.id);
res.json({ user });
});