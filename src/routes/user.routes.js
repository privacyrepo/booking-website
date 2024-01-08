const express = require('express');
const UserController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware'); // INPUT_REQUIRED {Assuming auth.middleware exists}
const router = express.Router();

router.get('/account', protect, UserController.getAccountDetails);
router.put('/account', protect, UserController.updateAccountDetails);
router.get('/bookings', protect, UserController.getBookings);
router.delete('/bookings/:bookingId', protect, UserController.cancelBooking);

module.exports = router;
