import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const jobSlice = createSlice({
  name: 'job',
  initialState,
});

export default jobSlice.reducer;
