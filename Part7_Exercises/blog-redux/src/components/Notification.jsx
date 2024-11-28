import PropTypes from "prop-types";
import React from "react";

const Notification = ({ message }) => {
  const { success, error } = message;
  if (success === "" || error === "") return null;
  return (
    <div className={success ? "success" : "error"}>
      {success ? success : error}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Notification;
