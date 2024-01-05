import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import Text from "../../Components/Text";
import Course from "../../Components/Course";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";

const AllCourse = () => {
  const classes = useStyles();
  const [userCouses, setUserCouses] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    axios
      .get("/userCourses")
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
  }, []);
  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        <Row className={`${classes.Row} mb-3`}>
          <Col className={`${classes.Col} ${classes.IconContainer}`}>
            <ImBooks className={classes.Icon} />
            <Text
              text={"My Courses"}
              size="20px"
              fontFamily="Open Sans"
              wegiht="600"
              color="#0e141e"
            />
          </Col>
        </Row>
        {userCouses.length === 0 ? (
          <Container className="d-flex justify-content-center align-items-center">
            <Text text={"Courses Not Found"} size="30px" />
          </Container>
        ) : (
          userCouses.map((item, index) => (
            <Row className={`${classes.Row} mb-4`} key={index}>
              <Col className={`${classes.Col}`}>
                <Course {...item} />
              </Col>
            </Row>
          ))
        )}
      </Row>
    </Container>
  );
};

export default AllCourse;
