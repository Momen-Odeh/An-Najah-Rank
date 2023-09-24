import React, { useState, useRef } from 'react';
import { Navbar, Nav, Overlay } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai'
import { SlArrowDown } from 'react-icons/sl'
import { Link } from 'react-router-dom';
import Style from './Style';

const UserChoices = () => {
  const classes = Style();
  const [showChoices, setShowChoices] = useState(false);
  const [userChoices, setUserChoices] = useState([
    { id: 1, title: 'Profile', link:'#Profile'},
    { id: 2, title: 'Settings', link:'#Settings'},
    { id: 3, title: 'Submissions', link:'#Submissions'},
    { id: 4, title: 'Administration', link:'#Administration'},
    { id: 5, title: 'Logout', link:'#Logout'},
  ]);
  const ref = useRef(null);

  const handlePopoverToggle = (event) => {
    event.preventDefault();
    setShowChoices(!showChoices);
  };

  const closePopover = () => {
    setShowChoices(false);
  };

  return (
    <Navbar.Collapse className="justify-content-end" >
      <Nav.Item>
        <Nav.Link className='d-flex align-items-center' ref={ref} onClick={handlePopoverToggle}>
          <div className={classes.iconContainer}>
              <AiOutlineUser size={24} color="#576871"/>
          </div> 
          <SlArrowDown size={20} className={classes.hoveringColor} color={showChoices?'white':''} />
        </Nav.Link>

        <Overlay
          show={showChoices}
          containerPadding={20}
          target={ref}
          placement="bottom-start"
          rootClose={true}
          onHide={closePopover}
        >
          <div className={classes.userChoicesContainer}>
            {userChoices.map((userChoice) => (
                <div key={userChoice.id} className={classes.choiceItem}>
                  <Link to={userChoice.link} className={`${classes.choiceLink}`}> {userChoice.title} </Link>
                  {userChoice.id !== userChoices[userChoices.length - 1].id && <hr className='m-2'></hr>} 
                </div>       
              ))}
          </div>
        </Overlay>
      </Nav.Item>
    </Navbar.Collapse>
  );
};

export default UserChoices;
