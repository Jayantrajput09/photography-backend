import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema({
  logo: String,
  brandName: String,
  heroTagline: String,
  heroBackground: String,
  phone: String,
  whatsapp: String,
  instagram: String,
  email: String,
  address: String,
  mapEmbed: String,
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);