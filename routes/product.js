const express = require('express');
const { deleteCategory } = require('../controllers/category');
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');
const Category = require('../models/Category');
const Product = require('../models/Product');

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Product, {
      path: 'category',
      select: 'name description',
    }),
    getProducts
  )
  .post(protect, authorize('publisher', 'admin'), addProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('publisher', 'admin'), updateProduct)
  .delete(protect, authorize('publisher', 'admin'), deleteProduct);
module.exports = router;
