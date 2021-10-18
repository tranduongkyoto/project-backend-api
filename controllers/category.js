const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Category = require('../models/Category');
const geocoder = require('../utils/geocoder');

// @desc      Get all Categories
// @route     GET /api/v1/Categories
// @access    Public
const getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single Category
// @route     GET /api/v1/Categories/:id
// @access    Public
const getCategory = asyncHandler(async (req, res, next) => {
  const Category = await Category.findById(req.params.id);
  if (!Category) {
    return next(
      new ErrorResponse(`Category not found witd id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: Category });
});

// @desc      Create new Category
// @route     POST /api/v1/Categories
// @access    Private
const createCategory = asyncHandler(async (req, res, next) => {
  // add user to req, body
  req.body.user = req.user.id;

  //check for published Category
  const publishedCategory = await Category.findOne({ user: req.user.id });

  //If the user is not an admin, they can only add one Category
  if (publishedCategory && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a Category`,
        400
      )
    );
  }
  const Category = await Category.create(req.body);
  res.status(201).json({ success: true, data: Category });
});

// @desc      Update Category
// @route     PUT /api/v1/Categories/:id
// @access    Private
const updateCategory = asyncHandler(async (req, res, next) => {
  const Category = await Category.findById(req.params.id, req.body);
  if (!Category) {
    return next(
      new ErrorResponse(`Category not found witd id of ${req.params.id}`, 404)
    );
  }

  if (Category.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} id not authorized to update this Category`,
        401
      )
    );
  }
  Category = await Category.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: Category });
});

// @desc      Delete Category
// @route     DELETE /api/v1/Categories/:id
// @access    Private
const deleteCategory = asyncHandler(async (req, res, next) => {
  const Category = await Category.findById(req.params.id);
  if (!Category) {
    return next(
      new ErrorResponse(`Category not found witd id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is Category owner
  if (Category.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this Category`,
        401
      )
    );
  }
  Category.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo for Category
// @route     PUT /api/v1/Categories/:id/photo
// @access    Private
const CategoryPhotoUpload = asyncHandler(async (req, res, next) => {
  const Category = await Category.findById(req.params.id);

  if (!Category) {
    return next(
      new ErrorResponse(`Category not found with id of  ${req.params.id}`, 404)
    );
  }
  // Make sure user is Category owner
  if (Category.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this Category`,
        401
      )
    );
  }
  if (!req.file) {
    return next(
      new ErrorResponse(`Please upload a  file fsbfdsfsbdfbf bfdsfd`, 400)
    );
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //check filesize

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom file
  file.name = `photo_${Category._id}${path.parse(file.name).ext}`;
  console.log(file.name);

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
  });

  await Category.findByIdAndUpdate(req.params.id, { photo: file.name });
  res.status(200).json({
    success: true,
    data: file.name,
  });
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  CategoryPhotoUpload,
};
