import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./services/blogs";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("loggedBlogappUser")));
    console.log("Hello");
  }, []);

  const data = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  const blogs = data.data;

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  if (data.isLoading) return <div>loading...</div>;

  console.log(user);

  return (
    <div>
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
