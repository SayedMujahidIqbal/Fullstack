import React from "react";

const Notification = ({ success, error }) => (
  <div className={success ? "success" : "error"}>
    {success ? success : error}
  </div>
);

export default Notification;
