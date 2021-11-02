const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Order = require('../models/Order');

// @desc      Get all Categories
// @route     GET /api/v1/Categories
// @access    Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
// @desc      Get single user
// @route     GET /api/v1/order/:id
// @access    Private/Admin

// order/5d7a514b5d2c12c7449be044 => req.params.id { id: '5d7a514b5d2c12c7449be044' } { ide: '5d7a514b5d2c12c7449be044' }
// order?user=5d7a514b5d2c12c7449be044 => req.query { user: '5d7a514b5d2c12c7449be044' }
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.params.id });
  console.log(order);
  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc      Create order
// @route     POST /api/order
// @access    Private/Admin
exports.createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);
  console.log(order);
  res.status(201).json({
    success: true,
    data: order,
  });
});

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
