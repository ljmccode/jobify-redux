import authFetch from '../../utils/authFetch';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';
import { displayAlert } from '../alert/alertSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
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
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const { data } = await authFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const { data } = await authFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(
      displayAlert({ alertText: 'Job Updated!', alertType: 'success' })
    );
    thunkAPI.dispatch(clearValues());
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
