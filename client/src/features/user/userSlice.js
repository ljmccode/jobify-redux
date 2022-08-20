import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { displayAlert } from '../alert/alertSlice';
import authFetch from '../../utils/authFetch';
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
      thunkAPI.dispatch(
        displayAlert({
          alertText: 'User Created! Redirecting...',
          alertType: 'success',
        })
      );
      return data;
    } catch (error) {
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
    const currentUser = user;
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, currentUser);
      thunkAPI.dispatch(
        displayAlert({
          alertText: 'Login successful! Redirecting...',
          alertType: 'success',
        })
      );
      return data;
    } catch (error) {
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    const currentUser = user;
    try {
      console.log(thunkAPI.getState().user);
      const { data } = await authFetch.patch(`/auth/updateuser`, currentUser);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
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
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export const { logoutUser, toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
