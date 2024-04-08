import Review from "../models/Review.js";

export const createReview = async (req, res, next) => {
  try {
    const { username, email, feedback, star } = req.body;
    const review = new Review({
      username,
      email,
      star,
      feedback,
    });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params; // Get hotelId from URL params
    const reviews = await Review.find({ hotelId: hotelId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReviewByHotelId = async (req, res, next) => {
  try {
    const { username, email, feedback, star } = req.body;
    const { hotelId } = req.params; // Get hotelId from URL params
    const review = new Review({
      username,
      email,
      star,
      feedback,
      hotelId, // Assign hotelId to the review
    });
    console.log(hotelId);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
