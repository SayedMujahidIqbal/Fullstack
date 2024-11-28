import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initiliazeBlogs } from "./reducers/blogReducer";
import { useField } from "./hooks/useField";
import {
  clearMessage,
  setErrorMessage,
  setSuccessMessage,
} from "./reducers/notificationReducer";

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const { success, error } = useSelector((state) => state.notification);
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiliazeBlogs());
  }, []);

  [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1));

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      dispatch(setSuccessMessage(`${user.name} LoggedIn successfully`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } catch (error) {
      dispatch(setErrorMessage("Wrong credentials"));
      setTimeout(() => {
        dispatch(clearMessage(""));
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setSuccessMessage(`${user.name} logged-out successfully`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
    setUser(null);
  };

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject));
    dispatch(
      setSuccessMessage(
        `A blog  ${blogObject.title} by ${blogObject.author} added`
      )
    );
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

  const handleLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const resultantBlog = await blogService.updatedBlog(id, updatedBlog);
    setBlogs(blogs.map((b) => (b.id !== id ? b : resultantBlog)));
  };

  const deleteBlog = async (blog) => {
    alert(`Remove blog ${blog.title} by ${blog.author}`);
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input {...{ ...username, reset: undefined }} />
      </div>
      <div>
        <input {...{ ...password, reset: undefined }} />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      {error || (success && <Notification success={success} error={error} />)}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>{" "}
          </p>
          {blogForm()}
        </div>
      )}
      <ul style={{ marginLeft: 0 }}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => handleLikes(blog.id)}
            deleteBlog={() => deleteBlog(blog)}
            loggedInUsername={user && user.username}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
