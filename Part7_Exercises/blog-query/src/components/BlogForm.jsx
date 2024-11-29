import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useField } from "../hooks/useField";
import { useNotificationDispatch } from "../NotificationContext";
import Togglable from "./Togglable";
import { useRef } from "react";
import { createBlog } from "../services/blogs";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const blogFormRef = useRef();
  const dispatch = useNotificationDispatch();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      console.log("hello from mutaion", newBlog);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      dispatch({
        type: "NEW_BLOG_ADDED_SUCCESS",
        payload: `blog '${newBlog.title}' added`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();
    if (title.value === "" || author.value === "" || url.value === "") {
      dispatch({
        type: "INVALID_BLOG",
        payload: "Blog fields cannot be empty",
      });
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } else {
      newBlogMutation.mutateAsync({
        title: title.value,
        author: author.value,
        url: url.value,
      });
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
