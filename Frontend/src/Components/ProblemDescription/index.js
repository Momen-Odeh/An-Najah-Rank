import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProblemStatement from "../ProblemStatement";
import ProblemValue from "../ProblemValue";
import data from "./data";
import CodeEditor from "../CodeEditor";
import ChallengeTabs from "../ChallengTabs";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import TestCaseProblem from "../TestCaseProblem";

const ProblemDescription = () => {
  const classes = useStyles({});
  const tabContent = [
    {
      eventKey: "TestCase 0",
      title: (
        <span>
          TestCase 0{" "}
          <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
        </span>
      ),
      TabComponent: <TestCaseProblem />,
    },
    {
      eventKey: "TestCase 1",
      title: (
        <span>
          TestCase 1{" "}
          <ImCross className={`${classes.Icon} ${classes.IconFail}`} />
        </span>
      ),
      TabComponent: <TestCaseProblem />,
    },
  ];
  return (
    <Container fluid>
      <Row className={classes.Row}>
        <Col xs={8} className={classes.Col}>
          <ProblemStatement data={data} />
        </Col>
        <Col xs={3} className={classes.Col}>
          <ProblemValue />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className={classes.Col}>
          <CodeEditor />
        </Col>
      </Row>
      <Row>
        <Col className={classes.Col}>
          <ChallengeTabs ListTabs={tabContent} PaddingTop="0" />
        </Col>
      </Row>
    </Container>
  );
};

export default ProblemDescription;
