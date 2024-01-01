import React from "react";
import Avatar from "react-avatar";
import useStyle from "./style";
import Text from "../../Components/Text";

const PersonInfo = ({ name, imgURL, lastMessageTime }) => {
  const classes = useStyle();
  return (
    <div className={classes.PersonInfo}>
      <div>
        <Avatar src={imgURL} name={name} color="#39424e" size="80" round />
      </div>
      <div className={classes.PersonInfoDetails}>
        <div>
          <Text text={name} />
        </div>
        <div>
          <Text text={lastMessageTime} />
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
