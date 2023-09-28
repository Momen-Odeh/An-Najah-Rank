import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ContestsDetalis from "../../Components/ContestDetails";
import ContestChallenges from "../../Components/ContestChallenges";
import useStyles from "./style";
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
  const clasess = useStyles();
  return (
    <>
      <Container fluid className={clasess.Container}>
        <Row className={`mt-2 ${clasess.maxWidth}`}>
          <Col>
            <Breadcrumbs path={path} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container fluid className={clasess.Container}>
        <Row className={`mb-4 ${clasess.maxWidth}`}>
          <Col>
            <Text text={"Momen Test"} size="36px" wegiht="500" height="40px" />
          </Col>
        </Row>
        <Row className={`mb-4 ${clasess.maxWidth}`}>
          <Col>
            <ChallengeTabs ListTabs={tabContent} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateContest;
