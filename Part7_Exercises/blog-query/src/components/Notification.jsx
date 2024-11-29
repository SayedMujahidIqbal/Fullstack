import React from "react";
import { useNotificationMessage } from "../NotificationContext";

const Notification = () => {
  const message = useNotificationMessage();
  if (!message) return null;
  return <div className="success">{message}</div>;
};

export default Notification;
