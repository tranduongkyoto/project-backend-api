const express = require('express');
const {
  createCheckoutSession,
  getCheckoutSession,
} = require('../controllers/stripe');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

// router.use(protect);
// router.use(authorize('admin'));

router.route('/create-checkout-session').post(createCheckoutSession);

router.route('/checkout-session').get(getCheckoutSession);

module.exports = router;
