import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumbs from "../../Components/Breadcrumbs";
import TextRegister from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ProblemDescription from "../../Components/ProblemDescription";
import SubmitionTab from "../../Components/SubmitionTab";
import LeadboardTab from "../../Components/LeadboardTab";
import useStyles from "./style";
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
    urlPattern:'/challenge/problem'
  },
  {
    eventKey: "Submissions",
    title: "Submissions",
    TabComponent: <SubmitionTab />,
    urlPattern:'/challenge/submissions'
  },
  {
    eventKey: "Leaderboard",
    title: "Leaderboard",
    TabComponent: <LeadboardTab />,
    urlPattern:'/challenge/leaderboard'
  },
  {
    eventKey: "Discussions",
    title: "Discussions",
    TabComponent: <h1>Tab4</h1>,
    urlPattern:'/challenge/discussions'
  },
];
const Challenge = ({}) => {
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
            <TextRegister
              text={"DAQ-Spring-2021-Q2"}
              size="36px"
              wegiht="500"
              height="40px"
            />
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

export default Challenge;
