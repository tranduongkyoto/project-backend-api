const express = require('express');
const { getDiscount } = require('../controllers/discount');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

router.use(protect);
// router.use(authorize('admin'));

router.route('/').post(getDiscount);

module.exports = router;
