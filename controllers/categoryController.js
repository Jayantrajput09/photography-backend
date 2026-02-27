import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  const categories = await Category.find().sort('name');
  res.json(categories);
};

// @desc    Create a category
// @route   POST /api/categories
export const createCategory = async (req, res) => {
  const { name } = req.body;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400).json({ message: 'Category already exists' });
  } else {
    const category = await Category.create({ name });
    res.status(201).json(category);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    // Optionally, remove category from photos? We'll just delete category, photos remain uncategorized.
    await category.deleteOne();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};