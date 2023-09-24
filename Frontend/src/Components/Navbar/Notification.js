import React, { useState, useRef} from 'react';
import { Nav, Badge, Overlay } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import useStyle from './Style';
const Notification = () => {
  const classes = useStyle()
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Notification 1', time:'2 min ago' },
    { id: 2, text: 'Notification 2', time:'2 hours ago' },
    { id: 3, text: 'Notification 3', time:'3 hours ago' },
  ]);
  const ref = useRef(null);

  const handleNotificationPanel = (event) => {
    event.preventDefault();
    setShowNotification(!showNotification);
  };

  const closeNotificationPanel = () => {
    setShowNotification(false);
  };

  return (
      <Nav.Item>
        <Nav.Link ref={ref} onClick={handleNotificationPanel}>
            <FaBell size={20} className={classes.hoveringColor} color={showNotification?'white':''}/>
            {notifications.length > 0 && (
                <Badge pill variant="" style={{ fontSize: '10px', padding:'3px 5px'}} >
                {notifications.length}
                </Badge>
            )}
        </Nav.Link>

        <Overlay
          show={showNotification}
          containerPadding={-0.5}
          target={ref}
          placement="bottom-end"
          rootClose={true}
          onHide={closeNotificationPanel}
        >
            <div className={classes.Overlay}>
                <div className={classes.OverlayTitle}>
                    <h5>Notifications</h5>
                </div>
                <div className={classes.OverlayContent}>
                    {notifications.map((notification) => (
                        <div key={notification.id} className={classes.notificationItem}>
                          <span className={classes.notificationText}>{notification.text}</span>
                          <span className={classes.notificationTime}>{notification.time}</span>
                        </div>
                    ))}
                    <hr className={classes.line}></hr>
                    <a className={classes.notificationLink} href="#Notification">Show all</a>
                </div>
            </div>
        </Overlay>

      </Nav.Item>
  );
};

export default Notification;
