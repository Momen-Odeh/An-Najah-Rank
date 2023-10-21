import React from "react";
import Text from "../Text";
import useStyle from "./Style";
import MessageLogo from "./images/N-messages.png";
const UserLimitAccess = ({ userName, email = null, access }) => {
  const classes = useStyle();
  return (
    <div className="d-flex m-3 align-items-center">
      <div className="me-3">
        <img src={MessageLogo} alt="userLogo" className={classes.image}></img>
      </div>
      <div className="d-flex flex-column">
        <Text color={"#0e141e"} wegiht={600} text={userName} height="20px" />
        {email && (
          <Text
            color={"#0e141e"}
            wegiht={200}
            text={email}
            size="14px"
            height="20px"
          />
        )}
        <Text
          color={"#0e141e"}
          wegiht={200}
          text={access}
          size="14px"
          height="20px"
        />
      </div>
    </div>
  );
};

export default UserLimitAccess;
