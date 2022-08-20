import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../user/userSlice.js';
import { displayAlert } from '../alert/alertSlice';
import {
  showLoading,
  hideLoading,
  getAllJobs,
} from '../allJobs/allJobsSlice.js';
import authFetch from '../../utils/authFetch.js';
import { getUserFromLocalStorage } from '../../utils/localStorage.js';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const { data } = await authFetch.post('/jobs', job);
      thunkAPI.dispatch(
        displayAlert({ alertText: 'New Job Created!', alertType: 'success' })
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const { data } = await authFetch.delete(`/jobs/${jobId}`);
      thunkAPI.dispatch(getAllJobs());
      return data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      console.log(payload);
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createJob.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
