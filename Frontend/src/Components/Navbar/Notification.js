import React, { useState, useRef, useContext } from "react";
import { Nav, Badge, Overlay } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import useStyle from "./Style";
import { useEffect } from "react";
import userContext from "../../Utils/userContext";
import { useNavigate } from "react-router-dom";
import { toastInfo } from "../../Utils/toast";
import axios from "axios";
import formatTimeAgo from "../../Utils/formateTimeAgo";

const Notification = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const {
    notifications,
    setNotifications,
    socket,
    newNotifications,
    setNewNotifications,
  } = useContext(userContext);
  const ref = useRef(null);

  useEffect(() => {
    if (socket) {
      socket?.on("notification", (data) => {
        setNotifications((prev) => [data, ...prev]);
        setNewNotifications((prev) => prev + 1);
        toastInfo(data.title);
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
  if (showNotification && newNotifications > 0) {
    axios.post("/update-last-notification", {
      title: notifications[0].title,
      time: notifications[0].time,
    });
    setNewNotifications(0);
  }
  return (
    <Nav.Item>
      <Nav.Link ref={ref} onClick={handleNotificationPanel}>
        <FaBell
          size={20}
          className={`${classes.hoveringColor} ${
            showNotification ? classes.clickedBtn : ""
          }`}
        />
        {newNotifications > 0 && (
          <Badge
            pill
            variant=""
            style={{ fontSize: "10px", padding: "3px 5px" }}
          >
            {newNotifications}
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
              <div
                key={index}
                className={`${classes.notificationItem}`}
                onClick={() => {
                  console.log(notification);
                  let url = "";
                  if (notification?.courseNumber)
                    url += `/courses/${notification.courseNumber}`;
                  if (notification?.contestId)
                    url += `/contests/${notification.contestId}`;
                  if (notification?.challengeId)
                    url += `/challenges/${notification.challengeId}`;
                  if (notification?.courseNumber) navigate(url);
                }}
              >
                <div className={classes.notificationText}>
                  {notification.title}
                </div>
                <div className={classes.notificationTime}>
                  {formatTimeAgo(notification.time)}
                </div>
              </div>
            ))}
            <hr className={classes.line}></hr>
            <a
              className={classes.notificationLink}
              href="#14"
              onClick={() => {
                navigate("/notifications");
              }}
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
