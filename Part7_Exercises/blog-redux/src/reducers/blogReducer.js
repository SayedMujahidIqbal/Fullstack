import { createSlice } from "@reduxjs/toolkit";
import blogServive from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

export const initiliazeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServive.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogServive.createBlog(newBlog);
    dispatch(appendBlog(createdBlog));
  };
};

export default blogSlice.reducer;
