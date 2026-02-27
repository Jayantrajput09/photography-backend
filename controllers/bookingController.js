import Booking from '../models/Booking.js';
import { sendBookingEmail } from '../utils/email.js';

// @desc    Create a booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    await sendBookingEmail(booking);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bookings (admin only)
// @route   GET /api/bookings
export const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort('-createdAt');
  res.json(bookings);
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    await booking.remove();
    res.json({ message: 'Booking removed' });
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};