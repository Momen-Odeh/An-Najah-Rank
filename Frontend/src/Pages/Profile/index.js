import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProfileAside from "../../Components/ProfileAside";
import ProfileMain from "../../Components/ProfileMain";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
const Profile = () => {
  const classes = useStyles();
  const [accountInfo, setAccountInfo] = useState({});
  const [userCouses, setUserCouses] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setAccountInfo({ ...response.data });
      })
      .then(() => {
        axios
          .get("/userCourses", { params: { limit: 3 } })
          .then((response) => {
            console.log(response.data.courses);
            setUserCouses(
              response.data.courses.map((item) => {
                return { ...item, url: "/courses/" + item.courseNumber };
              })
            );
            setLoadingPage(false);
          })
          .catch((error) => {
            console.log(error);
            setLoadingPage(false);
          });
      })
      .catch((error) => {
        console.log("Error fetching image:", error);
        if (error.response.status === 401) {
          toastError("unauthorized access");
          navigate("/log-in");
        } else setLoadingPage(false);
      });
  }, []);
  return loadingPage ? (
    <Loader />
  ) : (
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
