import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import alertSlice from './features/alert/alertSlice';
import jobSlice from './features/job/jobSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';

const rootReducer = combineReducers({
  user: userSlice,
  alert: alertSlice,
  job: jobSlice,
  allJobs: allJobsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
