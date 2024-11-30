import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ blogs, user }) => {
  return (
    <>
      <h2>blogs</h2>
      <BlogForm />
      <ul style={{ marginLeft: 0 }}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUsername={user && user.username}
            blogs={blogs}
          />
        ))}
      </ul>
    </>
  );
};

export default Blogs;
