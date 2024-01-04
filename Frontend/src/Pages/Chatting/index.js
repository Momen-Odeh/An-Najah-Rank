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
import { getPalestineDateTime } from "../../Utils/palestineDateTime";
// import activeUseStyle from "./activeStyle";

const Chatting = () => {
  const classes = UseStyle();
  const {
    activeUser,
    ConversationsData,
    setConversationsData,
    exchangeMessagesData,
    setExchangeMessagesData,
    activeConversationUsers,
    setActiveConversationUsers,
  } = useContext(userContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    setExchangeMessagesData([
      ...exchangeMessagesData,
      {
        message: message,
        myMessage: true,
      },
    ]);
    setMessage("");
    let old;
    const newConv = ConversationsData.filter((x) => {
      if (x.conversationID === activeConversationUsers.conversationID) {
        old = x;
      } else return x;
    });
    setConversationsData([
      { ...old, lastMessageTime: getPalestineDateTime() },
      ...newConv,
    ]);
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

  const [loading, setLoading] = useState(false);
  console.log("conv data", ConversationsData);
  const sendNewMessage = (email, message, setNewModal, setErrorMsg) => {
    console.log("New message: ", email, "   ", message);
    setLoading(true);
    axios
      .post("/add-conversation", {
        receiverEmail: email,
        messageContent: message,
      })
      .then(async (response) => {
        console.log(response);
        if (response?.message !== undefined) {
          await chooseConversation(
            ConversationsData.filter(
              (x) => x.conversationID === response.data.conversationID
            )[0]
          );
          let old;
          const newConv = ConversationsData.filter((x) => {
            if (x.conversationID === response.data.conversationID) {
              old = x;
            } else return x;
          });
          setConversationsData([
            { ...old, lastMessageTime: getPalestineDateTime() },
            ...newConv,
          ]);
          setNewModal({ show: false, email: "", message: "" });
        } else {
          console.log("conversation data in else: ", ConversationsData);
          setConversationsData([
            {
              name: response.data.name,
              imgURL: response.data.imgURL,
              lastMessageTime: response.data.time,
              conversationID: response.data.conversationID,
            },
            ...ConversationsData,
          ]);
          setExchangeMessagesData([
            {
              name: response.data.name,
              imgURL: response.data.imgURL,
              message: message,
              time: response.data.time,
              myMessage: true,
            },
          ]);
          setActiveConversationUsers({
            myName: activeUser.name,
            myImg: activeUser.image,
            otherName: response.data.name,
            otherImg: response.data.imgURL,
            conversationID: response.data.conversationID,
          });
          setNewModal({ show: false, email: "", message: "" });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 404) {
          setErrorMsg({
            email: "Not found email, please try again",
            message: null,
          });
        }
        setLoading(false);
      });
  };

  const chooseConversation = (item) => {
    // console.log(item);
    axios
      .get("/get-messages", { params: { conversationID: item.conversationID } })
      .then((response) => {
        setExchangeMessagesData(response.data.messages);
        console.log(response);
        console.log("item: ", item);
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
        console.log("response.data.conversations", response.data.conversations);
        console.log(response);
        const conversationId = sessionStorage.getItem("conversationId");
        sessionStorage.removeItem("conversationId");
        if (conversationId) {
          const activeConversation = response.data.conversations?.filter(
            (item) => item.conversationID == conversationId
          )[0];
          if (activeConversation) {
            chooseConversation(activeConversation);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.RowContainer}`}>
        <Col className={`${classes.ConversationsCol}`}>
          <Conversations
            ConversationsData={ConversationsData}
            handelSendNewMessage={sendNewMessage}
            handelChooseConversation={chooseConversation}
            activeConversationUsers={activeConversationUsers}
            loading={loading}
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
