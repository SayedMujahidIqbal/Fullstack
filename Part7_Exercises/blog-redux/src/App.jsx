import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { initiliazeBlogs } from "./reducers/blogReducer";
import {
  clearMessage,
  setSuccessMessage,
} from "./reducers/notificationReducer";
import Login from "./components/Login";
import { loggingOut } from "./reducers/loginReducer";
import Blogs from "./components/Blogs";

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const { success, error } = useSelector((state) => state.notification);
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiliazeBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(loggingOut());
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setSuccessMessage(`${user.name} logged-out successfully`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

  const sortedBlogs = [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1));

  return (
    <div>
      <h2>blogs</h2>
      {(error !== "" || success !== "") && (
        <Notification success={success} error={error} />
      )}
      {user === null ? (
        <Login />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>{" "}
          </p>
          {<BlogForm />}
        </div>
      )}
      <Blogs blogs={sortedBlogs} user={user} />
    </div>
  );
};

export default App;
