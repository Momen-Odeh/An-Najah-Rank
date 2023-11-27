import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChallengeTabs from "../../Components/ChallengTabs";
import ManageChallenges from "../../Components/ManageChallenges";
import ManageCourses from "../../Components/ManageCourses";
import Text from "../../Components/Text";
import useStyles from "./style";
import Breadcrumbs from "../../Components/Breadcrumbs";
const Administration = () => {
  const [data, setData] = useState({
    courses: [],
    challenges: [],
  });
  useEffect(() => {
    axios
      .get(`/challenges-for-owner`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const tabs = [
    {
      title: "Manage Courses",
      eventKey: "ManageCourses",
      TabComponent: <ManageCourses courses={data.courses} />,
      urlPattern: "/administration/courses",
    },
    {
      title: "Manage Challenges",
      eventKey: "ManageChallenges",
      TabComponent: <ManageChallenges challenges={data.challenges} />,
      urlPattern: "/administration/challenges",
    },
  ];
  const clasess = useStyles();

  return (
    <Container fluid className={clasess.Container}>
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col}`}>
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
