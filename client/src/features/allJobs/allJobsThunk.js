import authFetch from '../../utils/authFetch';
import { logoutUser } from '../user/userSlice';

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const { data } = await authFetch(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const { data } = await authFetch('/jobs/stats');
    return data;
  } catch (error) {
    thunkAPI.dispatch(logoutUser());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
