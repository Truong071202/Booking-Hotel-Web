// routes/review.js

import express from "express";
import {
  createReviewByHotelId, // Import createReviewByHotelId
  getAllReviews,
  getReviewsByHotelId,
  updateReview,
} from "../controllers/review.js";

const router = express.Router();

router.post("/hotel/:hotelId", createReviewByHotelId); // Update the route to use createReviewByHotelId

router.put("/:id", updateReview);

router.get("/", getAllReviews);

router.get("/hotel/:hotelId", getReviewsByHotelId);

export default router;
