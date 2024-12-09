import React from "react";

const Notify = ({ message }) => {
  if (!message) return null;
  return <div style={{ border: "4px solid red", color: "red" }}>{message}</div>;
};

export default Notify;
