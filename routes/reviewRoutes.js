import express from 'express';
import {
  getApprovedReviews,
  getAllReviews,
  createReview,
  approveReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/approved', getApprovedReviews);
router.route('/')
  .get(protect, getAllReviews)
  .post(createReview);

router.put('/:id/approve', protect, approveReview);
router.delete('/:id', protect, deleteReview);

export default router;