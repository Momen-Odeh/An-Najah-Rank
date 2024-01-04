import React, { useState, useRef, useEffect, useContext } from "react";
import { Nav, Badge, Overlay } from "react-bootstrap";
import { FaComment } from "react-icons/fa";
import useStyle from "./Style";
import userContext from "../../Utils/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Text from "../Text";
import formatTimeAgo from "../../Utils/formateTimeAgo";
import axios from "axios";
const Messages = () => {
  const classes = useStyle();
  const [showMessages, setShowMessages] = useState(false);
  const location = useLocation();
  const {
    socket,
    messageNotification,
    setMessageNotification,
    lastMessageRead,
    setLastMessageRead,
    numberOfNewMessages,
    setNumberOfNewMessages,
    ConversationsData,
    setConversationsData,
    exchangeMessagesData,
    setExchangeMessagesData,
    activeConversationUsers,
    setActiveConversationUsers,
  } = useContext(userContext);
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {}, []);
  const handleMessagesPanel = (event) => {
    event.preventDefault();
    setShowMessages(!showMessages);
  };

  const closeMessagesPanel = () => {
    setShowMessages(false);
  };

  const handleChooseMsg = (conversationId) => {
    sessionStorage.setItem("conversationId", conversationId);
    closeMessagesPanel();
    navigate("/chatting");
  };
  if (showMessages && numberOfNewMessages > 0) {
    setLastMessageRead(messageNotification[0]?.lastMessageID);
    axios.post("/update-last-message", {
      lastMessageID: messageNotification[0]?.lastMessageID,
    });
    setNumberOfNewMessages(0);
  }
  console.log("numberOfNewMessages: ", numberOfNewMessages);
  /********************************************************************************************** */
  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) {
      if (data.conversationID == activeConversationUsers.conversationID) {
        setExchangeMessagesData((prev) => [
          ...prev,
          {
            message: data.lastMessageContent,
            myMessage: false,
          },
        ]);
      }
      let contained = null;
      const newData = ConversationsData.filter((x) => {
        if (x.conversationID == data.conversationID) {
          contained = x;
        } else return x;
      });
      if (contained) {
        setConversationsData([
          {
            ...contained,
            lastMessageContent: data.lastMessageContent,
            lastMessageTime: data.lastMessageTime,
            lastMessageID: data.lastMessageID,
          },
          ...newData,
        ]);
      }
      if (!contained) {
        setConversationsData([data, ...ConversationsData]);
      }
      contained = null;
      const newMessage = messageNotification.filter((x) => {
        if (x.conversationID == data.conversationID) {
          contained = x;
        } else return x;
      });
      if (contained) {
        setMessageNotification([
          {
            ...contained,
            lastMessageContent: data.lastMessageContent,
            lastMessageTime: data.lastMessageTime,
            lastMessageID: data.lastMessageID,
          },
          ...newMessage,
        ]);
        console.log("contained.lastMessageID ", contained.lastMessageID);
        if (contained.lastMessageID <= lastMessageRead) {
          setNumberOfNewMessages(numberOfNewMessages + 1);
        }
      }
      if (!contained) {
        setMessageNotification([data, ...messageNotification]);
        setNumberOfNewMessages(numberOfNewMessages + 1);
      }
    }
  }, [data]);
  console.log("conversation data: ", ConversationsData);
  console.log("lastMessageRead", lastMessageRead);
  useEffect(() => {
    if (socket) {
      socket?.on("message", (message) => {
        setData(message);
      });
    }
  }, [socket]);
  /********************************************************************************************** */
  const [msgActive, setMsgActive] = useState(true);
  useEffect(() => {
    if (location.pathname.includes("/chatting")) {
      setMsgActive(false);
    } else {
      setMsgActive(true);
    }
  }, [location.pathname]);
  return (
    msgActive && (
      <Nav.Item className={classes.messages}>
        <Nav.Link onClick={handleMessagesPanel} ref={ref}>
          <FaComment
            size={20}
            className={`${classes.hoveringColor} ${
              showMessages ? classes.clickedBtn : ""
            }`}
          />
          {numberOfNewMessages > 0 && (
            <Badge
              pill
              variant=""
              style={{
                fontSize: "10px",
                padding: "3px 5px",
                margin: "0px 2px",
              }}
            >
              {numberOfNewMessages}
            </Badge>
          )}
        </Nav.Link>

        <Overlay
          show={showMessages}
          containerPadding={-0.5}
          target={ref}
          placement="bottom-end"
          rootClose={true}
          onHide={closeMessagesPanel}
        >
          <div className={classes.Overlay}>
            <div className={classes.OverlayTitle}>
              <h5>Messages</h5>
            </div>
            <div className={classes.OverlayContent}>
              {messageNotification.map((message, index) => (
                <div
                  className={classes.messageItem}
                  key={index}
                  onClick={() => handleChooseMsg(message.conversationID)}
                >
                  <Avatar
                    src={message.imgURL}
                    name={message.name}
                    color="#39424e"
                    size="50"
                    round
                  />
                  <div className={classes.messageContent}>
                    <div className={classes.messageSender}>
                      {message.name?.substring(0, 17) +
                        (message.name.length > 17 ? " ..." : "")}
                    </div>
                    <div className="d-flex justify-content-between">
                      <Text
                        text={
                          message.lastMessageContent?.substring(0, 15) +
                          (message.lastMessageContent.length > 15 ? " ..." : "")
                        }
                        size="14px"
                        wegiht="400"
                      />
                      <div className="d-flex justify-content-end">
                        <Text
                          text={formatTimeAgo(message.lastMessageTime)}
                          size="12px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <hr className={classes.line}></hr>
              <Link className={classes.notificationLink} to={"/chatting"}>
                Show all
              </Link>
            </div>
          </div>
        </Overlay>
      </Nav.Item>
    )
  );
};

export default Messages;
