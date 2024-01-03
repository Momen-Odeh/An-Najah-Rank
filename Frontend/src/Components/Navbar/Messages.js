import React, { useState, useRef, useEffect, useContext } from "react";
import { Nav, Badge, Overlay } from "react-bootstrap";
import { FaComment } from "react-icons/fa";
import useStyle from "./Style";
import userContext from "../../Utils/userContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Text from "../Text";
import formatTimeAgo from "../../Utils/formateTimeAgo";
const Messages = () => {
  const classes = useStyle();
  const [showMessages, setShowMessages] = useState(false);
  const { messageNotification } = useContext(userContext);
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

  return (
    <Nav.Item>
      <Nav.Link onClick={handleMessagesPanel} ref={ref}>
        <FaComment
          size={20}
          className={`${classes.hoveringColor} ${
            showMessages ? classes.clickedBtn : ""
          }`}
        />
        <Badge
          pill
          variant=""
          style={{ fontSize: "10px", padding: "3px 5px", margin: "0px 2px" }}
        >
          {5}
        </Badge>
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
  );
};

export default Messages;
