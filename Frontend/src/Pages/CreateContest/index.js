import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ContestsDetalis from "../../Components/ContestDetails";
import ContestChallenges from "../../Components/ContestChallenges";
const path = [
  {
    title: "Manage Contests",
    url: "/log-in",
  },
  {
    title: "   Momen Test",
    url: "",
  },
];

const tabContent = [
  {
    eventKey: "Details",
    title: "Details",
    TabComponent: <ContestsDetalis />,
  },
  {
    eventKey: "ContestChallenges",
    title: "Challenges",
    TabComponent: <ContestChallenges />,
  },
];
const CreateContest = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col>
            <Breadcrumbs path={path} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <Text text={"Momen Test"} size="36px" wegiht="500" height="40px" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <ChallengeTabs ListTabs={tabContent} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateContest;
