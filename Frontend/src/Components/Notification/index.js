import React, { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const userUniversityNumber = "123456";
    const socket = io("http://localhost:5000", {
      query: {
        user_university_number: userUniversityNumber,
      },
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  socket?.on("notification", (notification) => {
    setNotifications([...notifications, notification]);
  });

  const handleAdd = () => {
    socket?.emit("add_user");
  };

  return (
    <div>
      <button onClick={handleAdd}>Add</button>

      {notifications.map((notification) => (
        <div>
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
