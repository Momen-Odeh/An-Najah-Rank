import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Text from "../Text";

const ProblemStatement = ({ data }) => {
  const classes = useStyles();
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span className={classes.descrition}> {data.descrition}</span>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className={classes.Col}>
          <Text text={"Input Format"} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span className={classes.descrition}> {data.inputFormat}</span>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className={classes.Col}>
          <Text text={"Constraints"} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span className={classes.descrition}> {data.Constraints}</span>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className={classes.Col}>
          <Text text={"Output Format"} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={classes.Col}>
          <span className={classes.descrition}> {data.outputFormat}</span>
        </Col>
      </Row>
      {data.sampleInput.map((item, index) => (
        <div key={index}>
          <Row className="mb-1">
            <Col className={classes.Col}>
              <Text text={`Simple Input ${index}`} />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className={`${classes.Col} ${classes.sample}`}>
              <pre className={classes.descrition}> {item}</pre>
            </Col>
          </Row>
        </div>
      ))}
      {data.sampleOutput.map((item, index) => (
        <div key={index}>
          <Row className="mb-1">
            <Col className={classes.Col}>
              <Text text={`Simple Output ${index}`} />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className={`${classes.Col} ${classes.sample}`}>
              <pre className={classes.descrition}> {item}</pre>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default ProblemStatement;
