import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user ? (
        <>
          <em>{user.name} logged-in </em>
          <button onClick={handleLogout}>logout</button>{" "}
        </>
      ) : (
        <Link to="/login" style={padding}>
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;
