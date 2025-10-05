import Book from "../models/Book.js";
import Review from "../models/Review.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const createBook = asyncHandler(async (req, res) => {
const { title, author, description, genre, year } = req.body;
const book = await Book.create({ title, author, description, genre, year, addedBy: req.user.id });
res.status(201).json(book);
});

export const getBooks = asyncHandler(async (req, res) => {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 5;
const skip = (page - 1) * limit;

const q = req.query.q || "";
const genre = req.query.genre || "";
const sort = req.query.sort || "-createdAt"; // e.g., "-avgRating" if you add stored avg later

const filter = {};
if (q) filter.$or = [
{ title: { $regex: q, $options: "i" } },
{ author: { $regex: q, $options: "i" } },
];
if (genre) filter.genre = genre;

const [items, total] = await Promise.all([
Book.find(filter).sort(sort).skip(skip).limit(limit).lean(),
Book.countDocuments(filter),
]);

res.json({
data: items,
pagination: { page, limit, total, pages: Math.ceil(total / limit) },
});
});

export const getBookById = asyncHandler(async (req, res) => {
const book = await Book.findById(req.params.id).populate("addedBy", "name email").lean();
if (!book) return res.status(404).json({ message: "Book not found" });

const [agg] = await Review.aggregate([
{ $match: { bookId: new mongoose.Types.ObjectId(book._id) } },
{ group: { _id: "bookId", avgRating: { 

avg:"rating" }, count: { $sum: 1 } } },
]);

const reviews = await Review.find({ bookId: book._id })
.populate("userId", "name email")
.sort("-createdAt")
.lean();

res.json({
...book,
averageRating: agg ? Number(agg.avgRating.toFixed(2)) : 0,
reviewsCount: agg ? agg.count : 0,
reviews,
});
});

export const updateBook = asyncHandler(async (req, res) => {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: "Book not found" });
if (book.addedBy.toString() !== req.user.id) {
return res.status(403).json({ message: "Not allowed" });
}
const fields = ["title", "author", "description", "genre", "year"];
fields.forEach((f) => (book[f] = req.body[f] ?? book[f]));
await book.save();
res.json(book);
});

export const deleteBook = asyncHandler(async (req, res) => {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: "Book not found" });
if (book.addedBy.toString() !== req.user.id) {
return res.status(403).json({ message: "Not allowed" });
}
await book.deleteOne();
await Review.deleteMany({ bookId: book._id });
res.json({ message: "Book deleted" });
});