import React, { useState, useRef } from 'react';
import { Nav, Overlay } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai'
import { SlArrowDown } from 'react-icons/sl'
import { Link } from 'react-router-dom';
import Style from './Style';

const UserChoices = ({userChoices}) => {
  const classes = Style();
  const [showChoices, setShowChoices] = useState(false);
  const ref = useRef(null);
  const handleUserChoices = (event) => {
    event.preventDefault();
    setShowChoices(!showChoices);
  };
  const closeUserChoices = () => {
    setShowChoices(false);
  };

  return (
      <Nav.Item>
        <Nav.Link className='d-flex align-items-center' ref={ref} onClick={handleUserChoices}>
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
          onHide={closeUserChoices}
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
  );
};

export default UserChoices;
