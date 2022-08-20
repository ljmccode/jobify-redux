import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import alertSlice from './features/alert/alertSlice';
import jobSlice from './features/job/jobSlice';

const rootReducer = combineReducers({
  user: userSlice,
  alert: alertSlice,
  job: jobSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
