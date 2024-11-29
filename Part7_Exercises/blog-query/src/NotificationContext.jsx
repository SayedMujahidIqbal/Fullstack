import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.payload;
    case "LOGIN_FAILURE":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    case "NEW_BLOG_ADDED_SUCCESS":
      return action.payload;
    case "INVALID_BLOG":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
