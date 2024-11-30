import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { login } from "../reducers/loginReducer";
import {
  clearMessage,
  setErrorMessage,
  setSuccessMessage,
} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        login({
          username: username.value,
          password: password.value,
        })
      );
      username.reset();
      password.reset();
      navigate("/");
    } catch (error) {
      dispatch(setErrorMessage("Wrong credentials"));
      setTimeout(() => {
        dispatch(clearMessage(""));
      }, 3000);
    }
  };

  return (
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
};

export default Login;
