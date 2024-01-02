import React from "react";
import Avatar from "react-avatar";
import useStyle from "./style";
import Text from "../../Components/Text";
import activeUseStyle from "./activeStyle";
const PersonInfo = ({ name, imgURL, lastMessageTime, active }) => {
  const classes = useStyle();
  const activeClasses = activeUseStyle({ active });
  return (
    <div className={`${classes.PersonInfo} ${activeClasses.active}`}>
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
