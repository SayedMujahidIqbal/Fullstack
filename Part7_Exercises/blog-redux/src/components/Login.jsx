import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { login } from "../reducers/loginReducer";
import { clearMessage, setErrorMessage } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.value === "" || password.value === "") {
      dispatch(setErrorMessage("Please enter username and password"));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } else {
      dispatch(
        login({
          username: username.value,
          password: password.value,
        })
      );
      username.reset();
      password.reset();
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div style={{ margin: 5 }}>
        <TextField
          {...{ ...username, reset: undefined }}
          label="username"
          style={{ width: "20rem" }}
        />
      </div>
      <div style={{ margin: 5 }}>
        <TextField
          {...{ ...password, reset: undefined }}
          label="password"
          style={{ width: "20rem" }}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        id="login-button"
        style={{ width: "10rem" }}
      >
        login
      </Button>
    </form>
  );
};

export default Login;
