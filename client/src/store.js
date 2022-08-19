import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import alertSlice from './features/alert/alertSlice';

const rootReducer = combineReducers({
  user: userSlice,
  alert: alertSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
