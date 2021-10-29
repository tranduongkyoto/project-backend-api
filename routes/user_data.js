const express = require('express');
const {
  addUserData,
  getUserData,
  updateUserData,
} = require('../controllers/user_data');
// const advancedResults = require('../middlewares/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

router.use(protect);
// router.use(authorize('admin'));

router.route('/').post(addUserData);
router.route('/:user_id').get(getUserData);
router.route('/:user_data_id').put(updateUserData);
module.exports = router;
