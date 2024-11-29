import { useMutation } from "@tanstack/react-query";
import { useField } from "../hooks/useField";
import { setToken } from "../services/blogs";
import { login } from "../services/login";
import { useNotificationDispatch } from "../NotificationContext";

const Login = () => {
  const dispatch = useNotificationDispatch();
  const username = useField("text");
  const password = useField("password");

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log(error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: `Wrong credentials`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onSuccess: (user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      username.reset();
      password.reset();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: `${user.name} successfully logged-in`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    },
  });

  const loginUser = async (event) => {
    event.preventDefault();
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
