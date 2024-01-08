import { combineReducers } from 'redux';
import { userDetailsReducer, userBookingsReducer } from './userReducer';

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  userBookings: userBookingsReducer,
  // other reducers will be added here
});

export default rootReducer;
