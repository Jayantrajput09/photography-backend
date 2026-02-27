import express from 'express';
import {
  getPhotos,
  getPhotosByCategory,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from '../controllers/photoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.route('/')
  .get(getPhotos)
  .post(protect, upload.single('image'), createPhoto);

router.get('/category/:categoryId', getPhotosByCategory);

router.route('/:id')
  .put(protect, upload.single('image'), updatePhoto)
  .delete(protect, deletePhoto);

export default router;