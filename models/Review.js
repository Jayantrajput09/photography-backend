import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);