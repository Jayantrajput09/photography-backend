import Photo from '../models/Photo.js';
import fs from 'fs';

// @desc    Get all photos with pagination, search & category filter
// @route   GET /api/photos
export const getPhotos = async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.page) || 1;

  // Build filter object
  const filter = {};

  // Keyword search (title)
  if (req.query.keyword) {
    filter.title = { $regex: req.query.keyword, $options: 'i' };
  }

  // Category filter
  if (req.query.category && req.query.category !== 'all') {
    filter.category = req.query.category;
  }

  const count = await Photo.countDocuments(filter);
  const photos = await Photo.find(filter)
    .populate('category')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt');

  res.json({ photos, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Get photos by category (alternative route, kept for compatibility)
// @route   GET /api/photos/category/:categoryId
export const getPhotosByCategory = async (req, res) => {
  const photos = await Photo.find({ category: req.params.categoryId }).populate('category');
  res.json(photos);
};

// @desc    Create a photo
// @route   POST /api/photos
export const createPhoto = async (req, res) => {
  const { title, description, category, price, showPrice } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  const photo = await Photo.create({
    title,
    description,
    imageUrl,
    category,
    price,
    showPrice,
  });
  res.status(201).json(photo);
};

// @desc    Update a photo
// @route   PUT /api/photos/:id
export const updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (photo) {
    photo.title = req.body.title || photo.title;
    photo.description = req.body.description || photo.description;
    photo.category = req.body.category || photo.category;
    photo.price = req.body.price || photo.price;
    photo.showPrice = req.body.showPrice ?? photo.showPrice;
    if (req.file) {
      // remove old image
      const oldPath = `.${photo.imageUrl}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      photo.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await photo.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

// @desc    Delete a photo
// @route   DELETE /api/photos/:id
export const deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (photo) {
    const path = `.${photo.imageUrl}`;
    if (fs.existsSync(path)) fs.unlinkSync(path);
    await photo.deleteOne(); // ✅ Fix: .remove() replaced with .deleteOne()
    res.json({ message: 'Photo removed' });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};