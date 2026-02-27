import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  eventType: String,
  date: Date,
  message: String,
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);