import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProblemStatement from "../ProblemStatement";
import ProblemValue from "../ProblemValue";
import CodeEditor from "../CodeEditor";
import ChallengeTabs from "../ChallengTabs";
import ChallengeContext from "../../Utils/ChallengeContext";
import LoaderRank from "../LoaderRank";

const ProblemDescription = () => {
  const classes = useStyles({});
  const context = useContext(ChallengeContext);
  const { tabContent, show } = context.testCases.val;
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
      {show && (
        <Row>
          <Col className={classes.Col}>
            <ChallengeTabs ListTabs={tabContent} PaddingTop="0" />
          </Col>
        </Row>
      )}
      {context.loading && (
        <Row>
          <Col className={classes.LoaderCol}>
            <LoaderRank loading={context.loading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProblemDescription;
