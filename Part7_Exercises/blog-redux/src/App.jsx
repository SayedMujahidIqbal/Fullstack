import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { initiliazeBlogs } from "./reducers/blogReducer";
import {
  clearMessage,
  setSuccessMessage,
} from "./reducers/notificationReducer";
import Login from "./components/Login";
import { loggingOut } from "./reducers/loginReducer";
import Blogs from "./components/Blogs";
import { initliazeUsers } from "./reducers/userReducer";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const users = useSelector(({ users }) => users);
  const { success, error } = useSelector((state) => state.notification);
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiliazeBlogs());
    dispatch(initliazeUsers());
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
    <>
      {(error !== "" || success !== "") && (
        <Notification success={success} error={error} />
      )}
      <Menu user={user} handleLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Blogs blogs={sortedBlogs} user={user} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
