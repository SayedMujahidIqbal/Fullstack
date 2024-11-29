import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./services/blogs";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const dispatch = useNotificationDispatch();

  const data = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  const blogs = data.data;

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({
      type: "LOGOUT",
      payload: `${user.name} logged out successfully`,
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 3000);
  };

  if (data.isLoading) return <div>loading...</div>;

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
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
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
