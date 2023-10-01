import React, { useState, useRef } from 'react';
import { Nav, Badge, Overlay } from 'react-bootstrap';
import { FaComment } from 'react-icons/fa';
import useStyle from './Style';
import MessagesLogo from './images/N-messages.png'
const Messages = () => {
  const classes = useStyle();
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John france', time: '2 min ago', content: 'Hello!' },
    { id: 2, sender: 'Alice don', time: '2 hours ago', content: 'How are you?' },
    { id: 3, sender: 'Bob dapo', time: '3 hours ago', content: 'Meeting at 3 PM.' },
  ]);
  const ref = useRef(null);

  const handleMessagesPanel = (event) => {
    event.preventDefault();
    setShowMessages(!showMessages);
  };

  const closeMessagesPanel = () => {
    setShowMessages(false);
  };
  
  return (
      <Nav.Item>
        <Nav.Link 
        onClick={handleMessagesPanel} ref={ref}>
          <FaComment size={20} className={`${classes.hoveringColor} ${showMessages?classes.clickedBtn:''}`}  />
          <Badge pill variant="" style={{ fontSize: '10px', padding: '3px 5px', margin:'0px 2px' }}>
            {messages.length}
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
              {messages.map((message) => (
                <div key={message.id} className={classes.messageItem}>
                    <div className="d-flex align-items-center">
                    <img src={MessagesLogo} alt='msg' className={classes.messageCircle}></img>
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className={classes.messageSender}>
                                {message.sender}
                            </span>
                            <span className={classes.messageTime}>
                                {message.time}
                            </span>
                        </div>
                        <span className={classes.messageContent}>
                        {message.content}
                        </span>
                    </div>
                    </div>
                </div>              
                ))}
              <hr className={classes.line}></hr>
              <a className={classes.notificationLink} href="#Messages">
                Show all
              </a>
            </div>
          </div>
        </Overlay>
      </Nav.Item>
  );
};

export default Messages;
