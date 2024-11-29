import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearMessage, setErrorMessage } from "../reducers/notificationReducer";
import { useField } from "../hooks/useField";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import { useRef } from "react";

const BlogForm = () => {
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

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...{ ...title, reset: undefined }} />
        </div>
        <div>
          Author:
          <input {...{ ...author, reset: undefined }} />
        </div>
        <div>
          URL:
          <input {...{ ...url, reset: undefined }} />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
