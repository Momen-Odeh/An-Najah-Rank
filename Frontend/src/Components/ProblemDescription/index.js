import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProblemStatement from "../ProblemStatement";
import ProblemValue from "../ProblemValue";
import CodeEditor from "../CodeEditor";
import ChallengeTabs from "../ChallengTabs";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import TestCaseProblem from "../TestCaseProblem";
import ChallengeContext from "../../Utils/ChallengeContext";

const ProblemDescription = () => {
  const classes = useStyles({});
  const context = useContext(ChallengeContext);

  return (
    <Container fluid>
      <Row className={classes.Row}>
        <Col xs={8} className={classes.Col}>
          <ProblemStatement />
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
      {context.testCases.val.show && ( //******************************************************************************* */
        <Row>
          <Col className={classes.Col}>
            <ChallengeTabs
              ListTabs={context.testCases.val.tabContent}
              PaddingTop="0"
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProblemDescription;
