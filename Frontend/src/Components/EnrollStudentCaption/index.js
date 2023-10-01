import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";

const EnrollStudentCaption = ({ title, body, backgroundColor = "#f8f9fa" }) => {
  const classes = useStyles({ backgroundColor });
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        <Col className={classes.Col}>
          <Text
            color="#39424E"
            size="32px"
            text={title}
            fontFamily="open-scene"
          />
        </Col>
      </Row>
      <Row className={classes.Row}>
        <Col className={classes.Col}>{body}</Col>
      </Row>
    </Container>
  );
};

export default EnrollStudentCaption;
