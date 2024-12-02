import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  clearMessage,
  setError,
  setErrorMessage,
  setSuccessMessage,
} from "./notificationReducer";

const loginSlice = createSlice({
  name: "loggedInUser",
  initialState: {
    user: {},
  },
  reducers: {
    setLoggedInUser(state, action) {
      return { ...state, user: action.payload };
    },
    removeLoggedInuser(state, action) {
      return { ...state, user: {} };
    },
  },
});

export const { setLoggedInUser, removeLoggedInuser } = loginSlice.actions;

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLoggedInUser(user));
      dispatch(setSuccessMessage(`${user.name} LoggedIn successfully`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } catch (error) {
      dispatch(setErrorMessage("Wrong Crednetials"));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  };
};

export const loggingOut = () => {
  return async (dispatch) => {
    dispatch(removeLoggedInuser());
  };
};

export default loginSlice.reducer;
