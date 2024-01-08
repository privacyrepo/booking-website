import Axios from 'axios';
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
  USER_BOOKING_CANCEL_REQUEST,
  USER_BOOKING_CANCEL_SUCCESS,
  USER_BOOKING_CANCEL_FAIL
} from '../constants/userConstants';

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await Axios.get(`/api/user/account`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await Axios.put(`/api/user/profile`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const getUserBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_BOOKINGS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await Axios.get(`/api/user/bookings`, config);
    dispatch({
      type: USER_BOOKINGS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_BOOKINGS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const cancelBooking = (bookingId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_BOOKING_CANCEL_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    await Axios.delete(`/api/user/bookings/${bookingId}`, config);
    dispatch({ type: USER_BOOKING_CANCEL_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_BOOKING_CANCEL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};
