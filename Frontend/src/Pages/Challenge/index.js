import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumbs from "../../Components/Breadcrumbs";
import TextRegister from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ProblemDescription from "../../Components/ProblemDescription";
const path = [
  {
    title: "All Contests",
    url: "/log-in",
  },
  {
    title: "  DAQ-Summer-2021-Q3",
    url: "",
  },
  {
    title: "DAQ-Spring-2021-Q2",
    url: "",
  },
];

const tabContent = [
  {
    eventKey: "Problem",
    title: "Problem",
    TabComponent: <ProblemDescription />,
  },
  {
    eventKey: "Submissions",
    title: "Submissions",
    TabComponent: <h1>Tab2</h1>,
  },
  {
    eventKey: "Leaderboard",
    title: "Leaderboard",
    TabComponent: <h1>Tab3</h1>,
  },
  {
    eventKey: "Discussions",
    title: "Discussions",
    TabComponent: <h1>Tab4</h1>,
  },
];
const Challenge = ({}) => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Breadcrumbs path={path} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <TextRegister
            text={"DAQ-Spring-2021-Q2"}
            size="36px"
            wegiht="500"
            height="40px"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <ChallengeTabs ListTabs={tabContent} />
        </Col>
      </Row>
    </Container>
  );
};

export default Challenge;
