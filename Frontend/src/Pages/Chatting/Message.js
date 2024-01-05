import React from "react";
import { Col, Row } from "react-bootstrap";
import useStyle from "./style";
import Avatar from "react-avatar";
import Text from "../../Components/Text";

const Message = ({ name, imgURL, message, time, myMessage, smallScreen }) => {
  const classes = useStyle();
  return (
    <Row className={classes.Message}>
      {myMessage && <Col></Col>}
      <Col
        className={classes.MessageAvatar}
        xs={{ span: "auto", order: myMessage ? "1" : "0" }}
      >
        <Avatar name={name} src={imgURL} color="#39424e" size="60" round />
      </Col>
      <Col className={`${classes.MessageBody}`} xs={"auto"}>
        <Text text={message} />
      </Col>
    </Row>
  );
};

export default Message;
