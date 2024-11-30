import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./services/blogs";
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

  const sortedBlogs = [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1));

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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
