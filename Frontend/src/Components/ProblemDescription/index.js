import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import ProblemStatement from "../ProblemStatement";
import ProblemValue from "../ProblemValue";
import data from "./data";
const ProblemDescription = () => {
  const classes = useStyles();
  return (
    <Container fluid>
      <Row className={classes.Row}>
        <Col xs={8} className={classes.Col1}>
          <ProblemStatement data={data} />
        </Col>
        <Col xs={3} className={classes.Col2}>
          <ProblemValue />
        </Col>
      </Row>
    </Container>
  );
};

export default ProblemDescription;
