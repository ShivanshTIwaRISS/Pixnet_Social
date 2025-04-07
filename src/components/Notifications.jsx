import React, { useEffect } from "react";
import "../styles/Notifications.css";

const Notification = ({ message, clearNotification }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clearNotification]);

  if (!message) return null;

  return <div className="notification">{message}</div>;
};

export default Notification;
