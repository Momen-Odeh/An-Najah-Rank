import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProfileAside from "../../Components/ProfileAside";
import ProfileMain from "../../Components/ProfileMain";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const clasess = useStyles();
  const [accountInfo, setAccountInfo] = useState({});
  const [userCouses, setUserCouses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setAccountInfo({ ...response.data });

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
    <Container fluid className={clasess.Container}>
      <Row className={clasess.Row}>
        <Col className={`${clasess.Col} ${clasess.Aside}`} md={3}>
          <ProfileAside accountInfo={accountInfo} />
        </Col>
        <Col className={`${clasess.Col} ${clasess.main}`}>
          <ProfileMain userCouses={userCouses} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
