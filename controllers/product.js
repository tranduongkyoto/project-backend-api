const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Product = require('../models/Product');
const Category = require('../models/Category');
// @desc      Get Products
// @route     GET /api/v1/Products
// @route     GET /api/v1/Categories/:CategoryId/Products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  if (req.params.CategoryId) {
    const Products = await Product.find({ Category: req.params.CategoryId });

    return res.status(200).json({
      success: true,
      count: Products.length,
      data: Products,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single Product
// @route     GET /api/v1/Products/:id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const Product = await Product.findById(req.params.id).populate({
    path: 'Category',
    select: 'name description',
  });

  if (!Product) {
    return next(
      new ErrorResponse(`No Product with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: Product,
  });
});

// @desc      Add Product
// @route     POST /api/v1/Categories/:CategoryId/Products
// @access    Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  req.body.Category = req.params.CategoryId;
  req.body.user = req.user.id;
  const Category = await Category.findById(req.params.CategoryId);

  if (!Category) {
    return next(
      new ErrorResponse(`No Category with the id of ${req.params.CategoryId}`),
      404
    );
  }
  // Make sure user is Category owner
  if (Category.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a Product to Category ${Category._id}`,
        401
      )
    );
  }
  const Product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    data: Product,
  });
});

// @desc      Update Product
// @route     PUT /api/v1/Products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let Product = await Product.findById(req.params.id);

  if (!Product) {
    return next(
      new ErrorResponse(`No Product with the id of ${req.params.id}`),
      404
    );
  }
  // Make sure user is Product owner
  if (Product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update Product ${Product._id}`,
        401
      )
    );
  }
  Product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  Product.save();
  res.status(200).json({
    success: true,
    data: Product,
  });
});

// @desc      Delete Product
// @route     DELETE /api/v1/Products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const Product = await Product.findById(req.params.id);

  if (!Product) {
    return next(
      new ErrorResponse(`No Product with the id of ${req.params.id}`),
      404
    );
  }
  // Make sure user is Product owner
  if (Product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete Product ${Product._id}`,
        401
      )
    );
  }
  await Product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
