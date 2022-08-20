import axios from 'axios';
import authFetch from '../../utils/authFetch';
import { displayAlert } from '../alert/alertSlice';

import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await axios.post(url, user);
    thunkAPI.dispatch(
      displayAlert({
        alertText: 'User Created! Redirecting...',
        alertType: 'success',
      })
    );
    return data;
  } catch (error) {
    return thunkAPI.dispatch(
      displayAlert({
        alertText: error.response.data.msg,
        alertType: 'danger',
      })
    );
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await axios.post(url, user);
    thunkAPI.dispatch(
      displayAlert({
        alertText: 'Login successful! Redirecting...',
        alertType: 'success',
      })
    );
    return data;
  } catch (error) {
    return thunkAPI.dispatch(
      displayAlert({
        alertText: error.response.data.msg,
        alertType: 'danger',
      })
    );
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await authFetch.patch(`/auth/updateuser`, user);
    thunkAPI.dispatch(
      displayAlert({
        alertText: 'Update successful!',
        alertType: 'success',
      })
    );
    return data;
  } catch (error) {
    if (error.response.status !== 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.dispatch(
      displayAlert({
        alertText: error.response.data.msg,
        alertType: 'danger',
      })
    );
  }
};
