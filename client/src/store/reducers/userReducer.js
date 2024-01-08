import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
  BOOKING_CANCEL_REQUEST,
  BOOKING_CANCEL_SUCCESS,
  BOOKING_CANCEL_FAIL
} from '../constants/userConstants';

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userBookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case USER_BOOKINGS_REQUEST:
      return { loading: true };
    case USER_BOOKINGS_SUCCESS:
      return { loading: false, bookings: action.payload };
    case USER_BOOKINGS_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_CANCEL_REQUEST:
      return { ...state, loadingCancel: true };
    case BOOKING_CANCEL_SUCCESS:
      return {
        ...state,
        loadingCancel: false,
        bookings: state.bookings.map(booking =>
          booking._id === action.payload._id ? action.payload : booking
        )
      };
    case BOOKING_CANCEL_FAIL:
      return { ...state, loadingCancel: false, errorCancel: action.payload };
    default:
      return state;
  }
};

// Assume that there's no rootReducer code or it has been defined elsewhere
