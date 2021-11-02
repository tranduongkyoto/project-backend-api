const express = require('express');
const { createOrder, getOrder, getOrders } = require('../controllers/order');
const advancedResults = require('../middlewares/advancedResults');

const Order = require('../models/Order');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')
  .get(authorize('admin'), advancedResults(Order, 'user'), getOrders)
  .post(createOrder);
router.route('/:id').get(getOrder).put(getOrder).delete(getOrder);

module.exports = router;
