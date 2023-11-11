import React, { useState, useRef } from "react";
import { Nav, Overlay } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import useStyle from "./Style";
import Cookies from "js-cookie";
const UserChoices = ({ userChoices }) => {
  const classes = useStyle();
  const [showChoices, setShowChoices] = useState(false);
  const ref = useRef(null);
  const handleUserChoices = (event) => {
    event.preventDefault();
    setShowChoices(!showChoices);
  };
  const closeUserChoices = () => {
    setShowChoices(false);
  };
  const navigate = useNavigate();
  const logOutSystem = () => {
    const cookieNames = Object.keys(Cookies.get());
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName, { path: "/" });
    });
    navigate("/log-in");
  };
  return (
    <Nav.Item>
      <Nav.Link
        className="d-flex align-items-center"
        ref={ref}
        onClick={handleUserChoices}
      >
        <div className={classes.iconContainer}>
          <AiOutlineUser size={24} color="#576871" />
        </div>
        <SlArrowDown
          size={20}
          className={`${classes.hoveringColor} ${
            showChoices ? classes.clickedBtn : ""
          }`}
        />
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
              <duv
                onClick={() => {
                  if (userChoice.title === "Logout") {
                    logOutSystem();
                  } else {
                    navigate(userChoice.link);
                  }
                }}
                className={`${classes.choiceLink}`}
              >
                {userChoice.title}
              </duv>
              {userChoice.id !== userChoices[userChoices.length - 1].id && (
                <hr className="m-2"></hr>
              )}
            </div>
          ))}
        </div>
      </Overlay>
    </Nav.Item>
  );
};

export default UserChoices;
