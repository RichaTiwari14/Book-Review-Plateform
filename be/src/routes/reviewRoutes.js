import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { updateReview, deleteReview } from "../controllers/reviewController.js";

const router = Router();
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;