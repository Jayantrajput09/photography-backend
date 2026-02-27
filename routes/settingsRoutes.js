import express from 'express';
import { getSettings, updateSettings, uploadLogo } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(protect, updateSettings);

router.put('/logo', protect, upload.single('logo'), uploadLogo);

export default router;