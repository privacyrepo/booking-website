const User = require('../models/user.model');
const Booking = require('../models/booking.model'); // INPUT_REQUIRED {Assuming booking.model exists}
const { protect } = require('../middleware/auth.middleware'); // INPUT_REQUIRED {Assuming auth.middleware exists}
const httpStatusCodes = require('http-status-codes');

exports.getAccountDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving account details' });
  }
};

exports.updateAccountDetails = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating account details' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving bookings' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    await Booking.findByIdAndDelete(bookingId);
    res.status(httpStatusCodes.OK).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error cancelling booking' });
  }
};

module.exports = exports;
