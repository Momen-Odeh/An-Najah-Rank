import React from "react";
import useStyles from "./style";
import Text from "../Text";
import Avatar from "react-avatar";

const AvatarRank = ({ users }) => {
  const classes = useStyles();
  return (
    <div className={classes.Container}>
      {users.map((user, index) => (
        <div className={classes.AvatarContainer} key={index}>
          <div className={classes.AvatarImage}>
            <Avatar src={user.img} round size="100px" color="black" />
          </div>
          <div>
            <Text text={user.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarRank;
