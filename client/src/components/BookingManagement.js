import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Alert } from 'react-bootstrap';
import { getUserBookings, cancelBooking } from '../store/actions/userActions';

const BookingManagement = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.userBookings);
  
  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  const cancelHandler = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading && <div>Loading...</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Service</th>
            <th>Cancel Booking</th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{new Date(booking.date).toLocaleString()}</td>
              <td>{booking.service}</td>
              <td>
                <Button 
                  variant='danger' 
                  onClick={() => cancelHandler(booking._id)}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BookingManagement;
