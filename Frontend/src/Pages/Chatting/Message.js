import React from "react";
import { Col, Row } from "react-bootstrap";
import useStyle from "./style";
import Avatar from "react-avatar";
import Text from "../../Components/Text";

const Message = ({ rtl }) => {
  const classes = useStyle();
  return (
    <Row className={classes.Message}>
      {rtl && <Col></Col>}
      <Col
        className={classes.MessageAvatar}
        xs={{ span: "auto", order: rtl ? "1" : "0" }}
      >
        <Avatar name="Momen Odeh" color="#39424e" size="60" round />
      </Col>
      <Col className={classes.MessageBody} xs={"auto"}>
        <Text text={"Hi, How are you i am good what about you?"} />
      </Col>
    </Row>
  );
};

export default Message;
