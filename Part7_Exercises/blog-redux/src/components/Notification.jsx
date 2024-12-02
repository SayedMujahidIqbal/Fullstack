import React from "react";

const Notification = ({ success, error }) => {
  console.log(error);
  return (
    <div className={success ? "success" : "error"}>
      {success ? success : error}
    </div>
  );
};

export default Notification;
