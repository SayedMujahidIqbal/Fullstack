import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import { initiliazeBlogs } from "./reducers/blogReducer";
import {
  clearMessage,
  setSuccessMessage,
} from "./reducers/notificationReducer";
import { loggingOut } from "./reducers/loginReducer";
import { initliazeUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import Login from "./components/Login";
import User from "./components/User";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import Menu from "./components/Menu";
import Blog from "./components/Blog";

const App = () => {
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const { success, error } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiliazeBlogs());
    dispatch(initliazeUsers());
  }, []);

  const userMatch = useMatch("/users/:id");
  const userToView = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");

  const blogToShow = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <Paper>
        <Menu user={user} />
        {(error !== "" || success !== "") && (
          <Notification success={success} error={error} />
        )}
        <div>
          <Routes>
            <Route path="/users/:id" element={<User user={userToView} />} />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={blogToShow}
                  loggedInUsername={user && user.username}
                />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Blogs />} />
          </Routes>
        </div>
      </Paper>
    </Container>
  );
};

export default App;
