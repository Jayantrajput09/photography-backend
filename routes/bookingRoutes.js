import express from 'express';
import { createBooking, getBookings, deleteBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createBooking)
  .get(protect, getBookings);

router.route('/:id')
  .delete(protect, deleteBooking);

export default router;