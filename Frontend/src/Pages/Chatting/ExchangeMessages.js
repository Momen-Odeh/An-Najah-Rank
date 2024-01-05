import React, { useEffect, useRef } from "react";
import useStyle from "./style";
import { Col, Row } from "react-bootstrap";
import Message from "./Message";

const ExchangeMessages = ({
  exchangeMessagesData,
  setExchangeMessagesData,
  activeConversationUsers,
  smallScreen,
}) => {
  const classes = useStyle();
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [exchangeMessagesData]);
  console.log(
    "exchange Messages Data inside exchangeMessagesData comp: ",
    exchangeMessagesData
  );
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
              smallScreen={smallScreen}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default ExchangeMessages;
