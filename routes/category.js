const express = require('express');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  CategoryPhotoUpload,
} = require('../controllers/category');
const Category = require('../models/Category');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const ProductRouter = require('./product');

const router = express.Router();
// Product in a Category
router.use('/:CategoryId/Products', ProductRouter);

//upload photo
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), CategoryPhotoUpload);
//get all or create Category
router
  .route('/')
  .get(advancedResults(Category, 'Products'), getCategories)
  .post(protect, authorize('publisher', 'admin'), createCategory);
//update or delete Category
router
  .route('/:id')
  .get(getCategory)
  .put(protect, authorize('publisher', 'admin'), updateCategory)
  .delete(protect, authorize('publisher', 'admin'), deleteCategory);

module.exports = router;
