import Settings from '../models/Settings.js';

// @desc    Get settings
// @route   GET /api/settings
export const getSettings = async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json(settings);
};

// @desc    Update settings (text fields)
// @route   PUT /api/settings
export const updateSettings = async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json(settings);
};

// @desc    Upload logo
// @route   PUT /api/settings/logo
export const uploadLogo = async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  if (req.file) settings.logo = `/uploads/${req.file.filename}`;
  await settings.save();
  res.json(settings);
};