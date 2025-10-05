import Review from "../models/Review.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addOrUpdateReview = asyncHandler(async (req, res) => {
const { bookId } = req.params;
const { rating, reviewText } = req.body;

const review = await Review.findOneAndUpdate(
{ bookId, userId: req.user.id },
{ rating, reviewText },
{ new: true, upsert: true, setDefaultsOnInsert: true }
);

res.status(201).json(review);
});

export const updateReview = asyncHandler(async (req, res) => {
const review = await Review.findById(req.params.id);
if (!review) return res.status(404).json({ message: "Review not found" });
if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not allowed" });

const { rating, reviewText } = req.body;
if (rating) review.rating = rating;
if (reviewText) review.reviewText = reviewText;
await review.save();
res.json(review);
});

export const deleteReview = asyncHandler(async (req, res) => {
const review = await Review.findById(req.params.id);
if (!review) return res.status(404).json({ message: "Review not found" });
if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not allowed" });

await review.deleteOne();
res.json({ message: "Review deleted" });
});