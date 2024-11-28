import { createSlice } from "@reduxjs/toolkit";

const initialState = { success: "", error: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSuccess(state, action) {
      return { ...state, success: action.payload };
    },
    setError(state, action) {
      return { ...state, error: action.payload };
    },
    clearNotification(state, action) {
      return { success: "", error: "" };
    },
  },
});

export const { setSuccess, setError, clearNotification } =
  notificationSlice.actions;

export const setSuccessMessage = (message) => {
  return async (dispatch) => {
    dispatch(setSuccess(message));
  };
};

export const setErrorMessage = (message) => {
  return async (dispatch) => {
    dispatch(setError(message));
  };
};

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch(clearNotification());
  };
};

export default notificationSlice.reducer;
