import authFetch, { checkForUnauthorizedResponse } from '../../utils/authFetch';

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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const { data } = await authFetch('/jobs/stats');
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
