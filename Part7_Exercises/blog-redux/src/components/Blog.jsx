import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  setErrorMessage,
  setSuccessMessage,
} from "../reducers/notificationReducer";
import { deletingBlog, likingBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { Button, Container, Link, Typography } from "@mui/material";
import Comments from "./Comments";

const Blog = ({ blog, loggedInUsername }) => {
  const blogs = useSelector(({ blogs }) => blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteBlog = async (blog) => {
    alert(`Remove blog ${blog.title} by ${blog.author}`);
    try {
      dispatch(deletingBlog(blog));
      navigate("/");
      dispatch(setSuccessMessage(`${blog.title} by ${blog.author} removed`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } catch (error) {
      dispatch(setErrorMessage("You are not authorized to delete this blog"));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  };

  if (!blog) return null;

  const handleLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likingBlog(updatedBlog));
  };

  return (
    <Container>
      <div style={{ padding: "0.3rem" }}>
        <Typography variant="h3">{blog.title}</Typography>
        <Typography variant="body1">
          <Link href={blog.url}>{blog.url}</Link>
        </Typography>
        <Typography variant="body1">
          {blog.likes} likes{" "}
          <Button variant="outlined" onClick={() => handleLikes(blog.id)}>
            like
          </Button>
        </Typography>
        <Typography variant="body1">
          added by <b>{blog.creator.username}</b>
        </Typography>
        {loggedInUsername === blog.creator.username && (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteBlog(blog)}
          >
            remove
          </Button>
        )}
      </div>
      <Comments blog={blog} />
    </Container>
  );
};

export default Blog;
