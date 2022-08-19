import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    const currentUser = user;
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, currentUser);
      const { user, token, location } = data;
      // dispatch({
      //   type: SETUP_USER_SUCCESS,
      //   payload: { user, token, location, alertText },
      // });
      // addUserToLocalStorage({ user, token, location });
      console.log('success');
    } catch (error) {
      // dispatch({
      //   type: SETUP_USER_ERROR,
      //   payload: { msg: error.response.data.msg },
      // });
      return thunkAPI.rejectWithValue(error.response.data.msg);
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
});

export default userSlice.reducer;
