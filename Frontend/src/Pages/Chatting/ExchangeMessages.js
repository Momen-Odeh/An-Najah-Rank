import React, { useEffect, useRef } from "react";
import useStyle from "./style";
import { Col, Row } from "react-bootstrap";
import Message from "./Message";
import { useState } from "react";

const ExchangeMessages = ({
  exchangeMessagesData,
  setExchangeMessagesData,
  activeConversationUsers,
}) => {
  const classes = useStyle();
  // useEffect(() => {
  //   setExchangeMessagesData([
  //     {
  //       name: "Momen H. Odeh",
  //       imgURL: "",
  //       message: "Hi, How are you i am good what about you?",
  //       time: "",
  //       myMessage: true,
  //     },
  //     {
  //       name: "Momen H. Odeh",
  //       imgURL: "",
  //       message: "i want to ask you some qustions",
  //       time: "",
  //       myMessage: true,
  //     },
  //     {
  //       name: "Hussam Ahmad",
  //       imgURL: "",
  //       message: "Hi, Momen iam fine",
  //       time: "",
  //       myMessage: false,
  //     },
  //     {
  //       name: "Hussam Ahmad",
  //       imgURL: "",
  //       message: "sure you can ask me",
  //       time: "",
  //       myMessage: false,
  //     },
  //   ]
  //   );
  // }, []);
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom when the content changes
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [exchangeMessagesData]);
  return (
    <div className={classes.ExchangeMessages} ref={scrollContainerRef}>
      {exchangeMessagesData?.map((item, index) => (
        <Row key={index} className={classes.Col}>
          <Col className={classes.Col} key={index}>
            <Message
              key={index}
              {...item}
              name={
                item.myMessage === true
                  ? activeConversationUsers.myName
                  : activeConversationUsers.otherName
              }
              imgURL={
                item.myMessage === true
                  ? activeConversationUsers.myImg
                  : activeConversationUsers.otherImg
              }
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default ExchangeMessages;
