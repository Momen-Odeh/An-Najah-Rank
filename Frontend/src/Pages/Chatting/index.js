import React from "react";
import UseStyle from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Conversations from "./Conversations";

const chatting = () => {
  const classes = UseStyle();
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.RowContainer}>
        <Col className={`${classes.ConversationsCol} ${classes.Col}`}>
          <Conversations />
        </Col>
        <Col className={classes.ChatCol}>Col2</Col>
      </Row>
    </Container>
  );
};

export default chatting;
