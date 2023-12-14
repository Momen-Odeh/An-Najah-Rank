import React, { useState, useRef, useContext } from "react";
import { Nav, Overlay } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import useStyle from "./Style";
import Cookies from "js-cookie";
import userContext from "../../Utils/userContext";
import Avatar from "react-avatar";
const UserChoices = ({ userChoices }) => {
  const classes = useStyle();
  const [showChoices, setShowChoices] = useState(false);
  const { activeUser } = useContext(userContext);
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
    localStorage.clear();
    navigate("/log-in");
    window.location.reload();
  };
  return (
    <Nav.Item>
      <Nav.Link
        className="d-flex align-items-center"
        ref={ref}
        onClick={handleUserChoices}
      >
        {activeUser?.image ? (
          <Avatar round src={activeUser.image} size="40px" />
        ) : (
          <div className={classes.iconContainer}>
            <AiOutlineUser size={"30px"} color="#576871" />
          </div>
        )}
        <SlArrowDown
          size={20}
          className={`ml-2 ${classes.hoveringColor} ${
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
          {userChoices.map((userChoice, index) => (
            <div key={index} className={classes.choiceItem}>
              <duv
                onClick={() => {
                  if (userChoice.title === "Logout") {
                    closeUserChoices();
                    logOutSystem();
                  } else {
                    closeUserChoices();
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
