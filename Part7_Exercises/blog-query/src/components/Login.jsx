import { useMutation } from "@tanstack/react-query";
import { useField } from "../hooks/useField";
import { setToken } from "../services/blogs";
import { useState } from "react";
import { login } from "../services/login";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const [message, setMessage] = useState({ success: "", error: "" });

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log(error);
      setMessage({ ...message, error: "Wrong Credentials" });
      setTimeout(() => {
        setMessage({ ...message, error: "" });
      }, 3000);
    },
    onSuccess: (user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      username.reset();
      password.reset();
      setMessage({
        ...message,
        success: `${user.name} logged-in successfully`,
      });
      setTimeout(() => {
        setMessage({ ...message, success: "" });
      }, 3000);
    },
  });

  const loginUser = async (event) => {
    event.preventDefault();
    console.log("Hello");
    loginMutation.mutateAsync({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <form onSubmit={loginUser}>
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
};

export default Login;
