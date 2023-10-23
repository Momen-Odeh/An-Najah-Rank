import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import ChallengeTabs from "../../Components/ChallengTabs";
import ManageChallenges from "../../Components/ManageChallenges";
import ManageContests from "../../Components/ManageContests";
import ManageCourses from "../../Components/ManageCourses";
import Text from "../../Components/Text";
const Administration = () => {
  const [cookies, setCookies] = useCookies();
  const [data, setData] = useState({
    courses: [],
    challenges: [],
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/challenges-for-owner?token=${cookies.token}`)
      .then((res) => {
        setData(res.data);
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
  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col>
            <Text
              text={"Administration"}
              size="26px"
              wegiht="700"
              color="#0e141e"
              height="1.4"
            />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row>
          <Col>
            <ChallengeTabs ListTabs={tabs} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Administration;
