import React, { useContext, useEffect } from "react";
import UseStyle from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Conversations from "./Conversations";
import ExchangeMessages from "./ExchangeMessages";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";
import { useState } from "react";
import axios from "axios";
import userContext from "../../Utils/userContext";
import Text from "../../Components/Text";
// import activeUseStyle from "./activeStyle";

const Chatting = () => {
  const classes = UseStyle();
  // const activeClasses = activeUseStyle();
  const { activeUser } = useContext(userContext);
  const { socket } = useContext(userContext);
  const [ConversationsData, setConversationsData] = useState([
    // { name: "Momen H. Odeh", imgURL: "", lastMessageTime: "2023/12/25 10:12" },
    // { name: "Noor Aldeen", imgURL: "", lastMessageTime: "2023/5/25 10:12" },
    // { name: "Mohee", imgURL: "", lastMessageTime: "2023/5/25 10:12" },
  ]);
  const [exchangeMessagesData, setExchangeMessagesData] = useState([]);
  const [message, setMessage] = useState("");
  const [activeConversationUsers, setActiveConversationUsers] = useState({
    myName: "",
    myImg: "",
    otherName: "",
    otherImg: "",
    conversationID: null,
  });
  const sendMessage = () => {
    setExchangeMessagesData([
      ...exchangeMessagesData,
      {
        message: message,
        myMessage: true,
      },
    ]);
    setMessage("");
    // activeConversationUsers.conversationID
    //send api to store in DB
    axios
      .post("/add-message", {
        conversationId: activeConversationUsers.conversationID,
        messageContent: message,
      })
      .then((response) => console.log(response));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (message.length !== 0) sendMessage();
    }
  };

  const sendNewMessage = (email, message) => {
    console.log("New message: ", email, "   ", message);
    setConversationsData([
      { name: email, imgURL: "", lastMessageTime: "2023/5/25 10:12" },
      ...ConversationsData,
    ]);
    setExchangeMessagesData([
      {
        name: "email",
        imgURL: "",
        message: message,
        time: "",
        myMessage: true,
      },
    ]);
  };

  const chooseConversation = (item) => {
    // console.log(item);
    axios
      .get("/get-messages", { params: { conversationID: item.conversationID } })
      .then((response) => {
        setExchangeMessagesData(response.data.messages);
        console.log(response);
        setActiveConversationUsers({
          myName: activeUser.name,
          myImg: activeUser.image,
          otherName: item.name,
          otherImg: item.imgURL,
          conversationID: item.conversationID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("/get-conversations", { params: { all: 1 } })
      .then((response) => {
        setConversationsData(response.data.conversations);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket?.on("message", (data) => {
        setExchangeMessagesData((prev) => [
          ...prev,
          {
            message: data.message,
            myMessage: false,
          },
        ]);
      });
    }
  }, [socket]);
  return (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.RowContainer}`}>
        <Col className={`${classes.ConversationsCol}`}>
          <Conversations
            ConversationsData={ConversationsData}
            handelSendNewMessage={sendNewMessage}
            handelChooseConversation={chooseConversation}
            activeConversationUsers={activeConversationUsers}
          />
        </Col>
        <Col className={`${classes.ChatCol} `}>
          {activeConversationUsers.conversationID !== null ? (
            <div>
              <ExchangeMessages
                exchangeMessagesData={exchangeMessagesData}
                setExchangeMessagesData={setExchangeMessagesData}
                activeConversationUsers={activeConversationUsers}
              />
            </div>
          ) : (
            <div className={classes.EmptyConversation}>
              <div className={classes.EmptyConversationInner}>
                <Text text={"Select a chat to start messaging"} />
              </div>
            </div>
          )}
          {activeConversationUsers.conversationID !== null && (
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chatting;
