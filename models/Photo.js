import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: Number,
  showPrice: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Photo', photoSchema);