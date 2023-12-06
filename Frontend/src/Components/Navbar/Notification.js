import React, { useState, useRef, useContext } from "react";
import { Nav, Badge, Overlay } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import useStyle from "./Style";
import { useEffect } from "react";
import userContext from "../../Utils/userContext";

const Notification = () => {
  const classes = useStyle();
  const [showNotification, setShowNotification] = useState(false);
  const { notifications, setNotifications, socket } = useContext(userContext);
  const ref = useRef(null);
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const timeAgo = new Date(timestamp);
    const timeDifference = now - timeAgo; // time in ms

    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;

    if (timeDifference < minute) {
      return Math.floor(timeDifference / second) + " seconds ago";
    } else if (timeDifference < hour) {
      return Math.floor(timeDifference / minute) + " minutes ago";
    } else if (timeDifference < day) {
      return Math.floor(timeDifference / hour) + " hours ago";
    } else if (timeDifference < month) {
      return Math.floor(timeDifference / day) + " days ago";
    } else if (timeDifference < year) {
      return Math.floor(timeDifference / month) + " months ago";
    } else {
      return Math.floor(timeDifference / year) + " years ago";
    }
  };

  useEffect(() => {
    if (socket) {
      socket?.on("notification", (data) => {
        setNotifications((prev) => [data, ...prev]);
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
              <div key={index} className={`${classes.notificationItem}`}>
                <div className={classes.notificationText}>
                  {notification.title}
                </div>
                <div className={classes.notificationTime}>
                  {formatTimeAgo(notification.time)}
                </div>
              </div>
            ))}
            {/* <hr className={classes.line}></hr>
            <a
              className={classes.notificationLink}
              href="#Notification"
            >
              Show all
            </a> */}
          </div>
        </div>
      </Overlay>
    </Nav.Item>
  );
};

export default Notification;
