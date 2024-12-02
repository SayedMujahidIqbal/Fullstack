import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loggingOut } from "../reducers/loginReducer";
import {
  clearMessage,
  setSuccessMessage,
} from "../reducers/notificationReducer";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const color = {
    color: "white",
    textDecoration: "none",
  };

  const handleLogout = () => {
    dispatch(loggingOut());
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setSuccessMessage(`${user.name} logged-out successfully`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="info">
          <Link to="/" style={color}>
            blogs
          </Link>
        </Button>
        <Button color="info">
          <Link to="/users" style={color}>
            users
          </Link>
        </Button>
        <Button color="info">
          {user ? (
            <>
              <em style={color}>{user.name} logged-in </em>
              {"  "}
              <a
                onClick={handleLogout}
                style={{
                  marginLeft: 5,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                logout
              </a>
            </>
          ) : (
            <Link to="/login" style={color}>
              login
            </Link>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
