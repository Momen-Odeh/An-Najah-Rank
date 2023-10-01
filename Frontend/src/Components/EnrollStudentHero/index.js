import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import Text from "../Text";

const EnrollStudentHero = () => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        <Col className={classes.Col}>
          <Text
            text={"Distributed Operating System Course"}
            color="#fff"
            size="30px"
          />
        </Col>
      </Row>
      <Row className={classes.Row}>
        <Col className={classes.Col}>
          <ButtonRank
            text={"Enroll Now"}
            backgroundColor="#2ec866"
            color="#fff"
            border="none"
            size="22.5px"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EnrollStudentHero;
