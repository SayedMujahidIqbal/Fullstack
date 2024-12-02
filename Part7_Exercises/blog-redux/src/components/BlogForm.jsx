import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearMessage, setErrorMessage } from "../reducers/notificationReducer";
import { useField } from "../hooks/useField";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import { useRef } from "react";
import { Button, Container, TextField } from "@mui/material";

const BlogForm = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = (event) => {
    event.preventDefault();
    if (title.value === "" || author.value === "" || url.value === "") {
      dispatch(setErrorMessage("Blog fields cannot be empty"));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } else {
      createBlog({ title: title.value, author: author.value, url: url.value });
      dispatch(
        setSuccessMessage(
          `A blog  ${blogObject.title} by ${blogObject.author} added`
        )
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
    title.reset();
    author.reset();
    url.reset();
  };

  if (!user) return null;

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div style={{ marginBottom: "0.5rem" }}>
          <TextField
            {...{ ...title, reset: undefined }}
            label="title"
            style={{ width: "20rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <TextField
            {...{ ...author, reset: undefined }}
            label="author"
            style={{ width: "20rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <TextField
            {...{ ...url, reset: undefined }}
            label="url"
            style={{ width: "20rem" }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          style={{ marginBottom: "0.5rem" }}
        >
          Add Blog
        </Button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
