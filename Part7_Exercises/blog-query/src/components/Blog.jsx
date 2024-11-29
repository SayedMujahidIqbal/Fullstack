import { useState } from "react";

const Blog = ({ blog, loggedInUsername, blogs }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: "none",
  };

  // const deleteBlog = async (blog) => {
  //   alert(`Remove blog ${blog.title} by ${blog.author}`);
  //   try {
  //     dispatch(deletingBlog(blog));
  //     dispatch(setSuccessMessage(`${blog.title} by ${blog.author} removed`));
  //     setTimeout(() => {
  //       dispatch(clearMessage());
  //     }, 3000);
  //   } catch (error) {
  //     dispatch(setErrorMessage("You are not authorized to delete this blog"));
  //     setTimeout(() => {
  //       dispatch(clearMessage());
  //     }, 3000);
  //   }
  // };

  const handleLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likingBlog(updatedBlog));
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
            onClick={() => deleteBlog(blog)}
          >
            remove
          </button>
        )}
      </div>
    </li>
  );
};

export default Blog;
