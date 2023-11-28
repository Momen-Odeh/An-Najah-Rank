import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProfileAside from "../../Components/ProfileAside";
import ProfileMain from "../../Components/ProfileMain";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const classes = useStyles();
  const [accountInfo, setAccountInfo] = useState({});
  const [userCouses, setUserCouses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setAccountInfo({ ...response.data });
      })
      .then(() => {
        axios
          .get("/userCourses")
          .then((response) => {
            console.log(response.data.courses);
            setUserCouses(
              response.data.courses.map((item) => {
                return { ...item, url: "/courses/" + item.courseNumber };
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Error fetching image:", error);
        if (error.response.status === 401) {
          toastError("unauthorized access");
          navigate("/log-in");
        }
      });
  }, []);
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        <Col className={`${classes.Col} ${classes.Aside}`} md={3}>
          <ProfileAside accountInfo={accountInfo} />
        </Col>
        <Col className={`${classes.Col} ${classes.main}`}>
          <ProfileMain userCouses={userCouses} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
