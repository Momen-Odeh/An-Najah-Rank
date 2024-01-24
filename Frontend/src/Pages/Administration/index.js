import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChallengeTabs from "../../Components/ChallengTabs";
import ManageChallenges from "../../Components/ManageChallenges";
import ManageCourses from "../../Components/ManageCourses";
import Text from "../../Components/Text";
import useStyles from "./style";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { toastError } from "../../Utils/toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
const Administration = () => {
  const navigate = useNavigate();

  const [loadingPage, setLoadingPage] = useState(true);
  const [courses, setCourses] = useState([]);
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    axios
      .get(`/challenges-for-owner`)
      .then((res) => {
        setCourses(res.data.courses);
        setChallenges(res.data.challenges);
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
        console.log(error);
      });
  }, []);
  const tabs = [
    {
      title: "Manage Courses",
      eventKey: "ManageCourses",
      TabComponent: <ManageCourses courses={courses} setCourses={setCourses} />,
      urlPattern: "/administration/courses",
    },
    {
      title: "Manage Challenges",
      eventKey: "ManageChallenges",
      TabComponent: <ManageChallenges challenges={challenges} />,
      urlPattern: "/administration/challenges",
    },
  ];
  const classes = useStyles();

  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.Row} mb-2`}>
        <Col className={`${classes.Col}`}>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={"Administration"}
            size="26px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChallengeTabs ListTabs={tabs} />
        </Col>
      </Row>
    </Container>
  );
};

export default Administration;
