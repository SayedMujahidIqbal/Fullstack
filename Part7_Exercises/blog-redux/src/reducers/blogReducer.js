import { createSlice } from "@reduxjs/toolkit";
import blogServive from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    removeBlog(state, action) {
      const blogeToBeRemoved = action.payload;
      return state.filter((b) => b.id !== blogeToBeRemoved.id);
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog));
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions;

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

export const likingBlog = (updatedNewBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogServive.updateBlog(
      updatedNewBlog.id,
      updatedNewBlog
    );
    dispatch(likeBlog(updatedBlog));
  };
};

export const deletingBlog = (blog) => {
  return async (dispatch) => {
    await blogServive.deleteBlog(blog.id);
    dispatch(removeBlog(blog));
  };
};

export default blogSlice.reducer;
