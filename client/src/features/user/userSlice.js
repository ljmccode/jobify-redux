import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { displayAlert } from '../alert/alertSlice';
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    const currentUser = user;
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, currentUser);
      // const { user, token, location } = data;
      // dispatch({
      //   type: SETUP_USER_SUCCESS,
      //   payload: { user, token, location, alertText },
      // });
      // addUserToLocalStorage({ user, token, location });
      thunkAPI.dispatch(
        displayAlert({
          alertText: 'User Created! Redirecting...',
          alertType: 'success',
        })
      );
      return data;
    } catch (error) {
      // dispatch({
      //   type: SETUP_USER_ERROR,
      //   payload: { msg: error.response.data.msg },
      // });
      thunkAPI.dispatch(
        displayAlert({
          alertText: error.response.data.msg,
          alertType: 'danger',
        })
      );
      return;
    }
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    console.log(`Login User : ${user}`);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
    },
    [registerUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
    },
    [loginUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
