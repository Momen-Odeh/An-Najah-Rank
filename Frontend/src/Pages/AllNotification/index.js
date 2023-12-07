import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoMdNotifications } from "react-icons/io";
import useStyles from "./styles";
import Text from "../../Components/Text";
import axios from "axios";
import formatTimeAgo from "../../Utils/formateTimeAgo";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../Utils/toast";
import Loader from "../../Components/Loader";
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    axios
      .get("/get-notifications", { params: { all: 1 } })
      .then((res) => {
        setNotifications(res.data.notifications);
        setLoadingPage(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //************* guard done ************************ */
          if (error?.response?.data?.message === "Access Denied") {
            toastError("Invalid Access");
            navigate("/");
          } else {
            toastError("Invalid Access");
            navigate("/log-in");
          }
        } else setLoadingPage(false);
      });
  }, []);

  const classes = useStyles();
  const navigate = useNavigate();

  return loadingPage ? (
    <Loader />
  ) : (
    <Container className={classes.container}>
      <h1 className={classes.title}>
        <Text text={"Notifications"} size="30px" />{" "}
        <IoMdNotifications size={"35px"} color="#7D7C7C" />
      </h1>
      {notifications.length === 0 && <Text text={"**No notifications yet"} />}
      {notifications?.map((notification, index) => (
        <div
          className={classes.notificationContainer}
          key={index}
          onClick={() => {
            console.log(notification);
            let url = "";
            if (notification.courseNumber)
              url += `/courses/${notification.courseNumber}`;
            if (notification.contestId)
              url += `/contests/${notification.contestId}`;
            if (notification.challengeId)
              url += `/challenges/${notification.challengeId}`;
            if (notification.courseNumber) navigate(url);
          }}
        >
          <Row>
            <Col>
              <p className={classes.message}>{notification.title}</p>
              <p className={classes.sendTime}>
                {formatTimeAgo(notification.time)}
              </p>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default NotificationPage;
