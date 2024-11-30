import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteBlog, updateBlog } from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";

const Blog = ({ blog, loggedInUsername, blogs }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: "none",
  };

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onError: (error) => {
      dispatch({
        type: "DELETE_BLOG_FAILURE",
        payload: `${error}`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      dispatch({
        type: "DELETE_BLOG_SUCCESS",
        payload: `${message}`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    },
  });

  const deletingBlog = async (blog) => {
    alert(`Remove blog ${blog.title} by ${blog.author}`);
    deleteMutation.mutate(blog.id);
  };

  const likeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueriesData(
        ["blogs"],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
    },
  });

  const handleLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    likeMutation.mutate(updatedBlog);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <li style={blogStyle} className="blogs">
      <span className="title">{blog.title}</span>
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      <div style={showWhenVisible} className="details">
        <p className="author" style={{ lineHeight: 0 }}>
          {blog.author}
        </p>
        <p className="url" style={{ lineHeight: 0 }}>
          {blog.url}
        </p>
        <p className="likes" style={{ lineHeight: 0 }}>
          Likes {blog.likes}{" "}
          <button onClick={() => handleLikes(blog.id)}>like</button>
        </p>
        {loggedInUsername === blog.creator.username && (
          <button
            style={{
              borderRadius: 5,
              background: "lightBlue",
            }}
            onClick={() => deletingBlog(blog)}
          >
            remove
          </button>
        )}
      </div>
    </li>
  );
};

export default Blog;
