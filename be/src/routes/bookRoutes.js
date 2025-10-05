import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import { addOrUpdateReview } from "../controllers/reviewController.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

// nested: upsert my review for a book
router.post("/:bookId/reviews", protect, addOrUpdateReview);

export default router;