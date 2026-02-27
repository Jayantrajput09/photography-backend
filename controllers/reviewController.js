import Review from '../models/Review.js';

// @desc    Get approved reviews (public)
// @route   GET /api/reviews/approved
export const getApprovedReviews = async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort('-createdAt');
  res.json(reviews);
};

// @desc    Get all reviews (admin)
// @route   GET /api/reviews
export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort('-createdAt');
  res.json(reviews);
};

// @desc    Create a review (public)
// @route   POST /api/reviews
export const createReview = async (req, res) => {
  const review = await Review.create({ ...req.body, approved: false });
  res.status(201).json(review);
};

// @desc    Approve a review
// @route   PUT /api/reviews/:id/approve
export const approveReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    review.approved = true;
    await review.save();
    res.json(review);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
};