import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLikes, deleteBlog, loggedInUsername }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: "none",
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
          Likes {blog.likes} <button onClick={updateLikes}>like</button>
        </p>
        {loggedInUsername === blog.creator.username && (
          <button
            style={{
              borderRadius: 5,
              background: "lightBlue",
            }}
            onClick={deleteBlog}
          >
            remove
          </button>
        )}
      </div>
    </li>
  );
};

Blog.propTypes = {
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
