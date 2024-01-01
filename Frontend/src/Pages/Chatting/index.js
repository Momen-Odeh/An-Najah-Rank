import React from "react";
import UseStyle from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Conversations from "./Conversations";
import ExchangeMessages from "./ExchangeMessages";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";
import { useState } from "react";
import handelStateChanges from "../../Utils/handelStateChanges";

const Chatting = () => {
  const classes = UseStyle();
  const [ConversationsData, setConversationsData] = useState([
    { name: "Momen H. Odeh", imgURL: "", lastMessageTime: "2023/12/25 10:12" },
    { name: "Noor Aldeen", imgURL: "", lastMessageTime: "2023/5/25 10:12" },
    { name: "Mohee", imgURL: "", lastMessageTime: "2023/5/25 10:12" },
  ]);
  const [exchangeMessagesData, setExchangeMessagesData] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    setExchangeMessagesData([
      ...exchangeMessagesData,
      {
        name: "Momen H. Odeh",
        imgURL: "",
        message: message,
        time: new Date(),
        myMessage: true,
      },
    ]);
    setMessage("");
    //send api to store in DB
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (message.length !== 0) sendMessage();
    }
  };
  return (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.RowContainer}`}>
        <Col className={`${classes.ConversationsCol} ${classes.Col}`}>
          <Conversations ConversationsData={ConversationsData} />
        </Col>
        <Col className={classes.ChatCol}>
          <div>
            <ExchangeMessages
              exchangeMessagesData={exchangeMessagesData}
              setExchangeMessagesData={setExchangeMessagesData}
            />
          </div>
          <div className={classes.InputMessageContainer}>
            <div className={classes.InputFiledRank}>
              <InputFiledRank
                placeholder={"Enter Message"}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div>
              <ButtonRank
                text={"Send"}
                onClick={sendMessage}
                disabled={message.length === 0}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chatting;
