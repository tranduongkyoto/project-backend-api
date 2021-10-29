const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const UserData = require('../models/UserData');

// @desc      Get user data with user_id
// @route     GET /api/user_data/:user_id
// @access    Public
exports.getUserData = asyncHandler(async (req, res) => {
  console.log(req.params);
  const user_data = await UserData.find({ user: req.params.user_id }).populate([
    'order',
    'cart',
  ]);
  console.log(user_data);
  if (user_data.length === 0) {
    return next(
      new ErrorResponse(`No user data with the user id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: user_data,
  });
});
// @desc      Add user data
// @route     POST /api/v1/Categories/:CategoryId/Products
// @access    Private
exports.addUserData = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const user_data = await UserData.create(data);
  console.log(user_data);
  if (!user_data) {
    return next(new ErrorResponse(`Error to create new user data`), 404);
  }

  res.status(200).json({
    success: true,
    data: user_data,
  });
});

// @desc      Update Product
// @route     PUT /api/user_data/:id
// @access    Private
exports.updateUserData = asyncHandler(async (req, res, next) => {
  console.log(req.params.user_data_id);
  let user_data = await UserData.findById(req.params.user_data_id);

  if (!user_data) {
    return next(
      new ErrorResponse(`No user data with the user_id of ${req.params.id}`),
      404
    );
  }
  user_data = await UserData.findByIdAndUpdate(
    req.params.user_data_id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  user_data.save();

  res.status(200).json({
    success: true,
    data: user_data,
  });
});
