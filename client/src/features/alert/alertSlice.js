import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAlert: false,
  alertText: '',
  alertType: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    displayAlert: (state, { payload }) => {
      state.showAlert = true;
      state.alertText = payload.alertText;
      state.alertType = payload.alertType;
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertText = '';
      state.alertType = '';
    },
  },
});

export const { displayAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
