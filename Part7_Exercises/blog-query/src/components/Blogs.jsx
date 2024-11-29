import Blog from "./Blog";

const Blogs = ({ blogs, user }) => {
  return (
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
  );
};

export default Blogs;
