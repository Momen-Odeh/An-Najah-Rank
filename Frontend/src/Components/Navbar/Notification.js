import React, { useState, useRef, useContext } from "react";
import { Nav, Badge, Overlay } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import useStyle from "./Style";
import { useEffect } from "react";
import io from "socket.io-client";
import userContext from "../../Utils/userContext";

const Notification = () => {
  const classes = useStyle();
  const [showNotification, setShowNotification] = useState(false);
  const { activeUser, setActiveUser } = useContext(userContext);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (activeUser.universityNumber) {
      const socket = io("http://127.0.0.1:5000", {
        query: {
          user_university_number: activeUser.universityNumber,
        },
      });
      setSocket(socket);
      return () => {
        socket.disconnect();
      };
    }
  }, [activeUser]);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const handleNotificationPanel = (event) => {
    event.preventDefault();
    setShowNotification(!showNotification);
  };

  const closeNotificationPanel = () => {
    setShowNotification(false);
  };

  const handleShowAll = () => {
    socket?.emit("add_user", { user: activeUser.universityNumber });
  };

  return (
    <Nav.Item>
      <Nav.Link ref={ref} onClick={handleNotificationPanel}>
        <FaBell
          size={20}
          className={`${classes.hoveringColor} ${
            showNotification ? classes.clickedBtn : ""
          }`}
        />
        {notifications?.length > 0 && (
          <Badge
            pill
            variant=""
            style={{ fontSize: "10px", padding: "3px 5px" }}
          >
            {notifications?.length}
          </Badge>
        )}
      </Nav.Link>

      <Overlay
        show={showNotification}
        containerPadding={-0.5}
        target={ref}
        placement="bottom-end"
        rootClose={true}
        onHide={closeNotificationPanel}
      >
        <div className={classes.Overlay}>
          <div className={classes.OverlayTitle}>
            <h5>Notifications</h5>
          </div>
          <div className={classes.OverlayContent}>
            {notifications?.map((notification, index) => (
              <div key={index} className={classes.notificationItem}>
                <span className={classes.notificationText}>
                  {notification.title}
                </span>
                <span className={classes.notificationTime}>
                  {notification.time}
                </span>
              </div>
            ))}
            <hr className={classes.line}></hr>
            <a
              className={classes.notificationLink}
              href="#Notification"
              onClick={handleShowAll}
            >
              Show all
            </a>
          </div>
        </div>
      </Overlay>
    </Nav.Item>
  );
};

export default Notification;
