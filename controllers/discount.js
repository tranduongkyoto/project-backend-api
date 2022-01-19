const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc      Get user data with user_id
// @route     GET /api/user_data/:user_id
// @access    Public
exports.getDiscount = asyncHandler(async (req, res) => {
  const { code } = req.body;
  console.log(req.body);
  var results = 0;
  switch (code) {
    case 'prj3':
      results = 25;
      break;
    case 'hust':
      results = 50;
      break;
  }
  console.log(results);
  res.status(200).json({
    success: true,
    data: results,
  });
});
