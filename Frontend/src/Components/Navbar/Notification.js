import React, { useState, useRef, useEffect} from 'react';
import { Navbar, Nav, Badge, Overlay, Popover } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import Style from './Style';
const Notification = () => {
  const classes = Style()
  const [showNotification, setShowNotification] = useState(false);
  const [target, setTarget] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Notification 1', time:'2 min ago' },
    { id: 2, text: 'Notification 2', time:'2 hours ago' },
    { id: 3, text: 'Notification 3', time:'3 hours ago' },
  ]);
  const ref = useRef(null);

  const handlePopoverToggle = (event) => {
    event.preventDefault();
    setTarget(event.target);
    setShowNotification(!showNotification);
  };

  const closePopover = () => {
    setShowNotification(false);
  };

  return (
    <Navbar.Collapse className="justify-content-end">
      <Nav.Item ref={ref}>
        <Nav.Link onClick={handlePopoverToggle}>
            <FaBell size={24} color='white'/>
            <i className="fas fa-bell"></i>
            {notifications.length > 0 && (
                <Badge pill variant="" style={{ fontSize: '10px', padding:'3px 5px'}}>
                {notifications.length}
                </Badge>
            )}
        </Nav.Link>

        <Overlay
          show={showNotification}
          containerPadding={100}
          target={target}
          placement="bottom-end"
          rootClose={true}
          onHide={closePopover}
        >
            <div className={`notification-panel ${classes.Overlay}`}>
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
    </Navbar.Collapse>
  );
};

export default Notification;
