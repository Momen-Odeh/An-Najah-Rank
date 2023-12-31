import React from "react";
import Avatar from "react-avatar";
import { Col, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../../Components/Text";

const PersonInfo = () => {
  const classes = useStyle();
  return (
    <div className={classes.PersonInfo}>
      <div>
        <Avatar name="Momen Odeh" color="#39424e" size="80" round />
      </div>
      <div className={classes.PersonInfoDetails}>
        <div>
          <Text text={"Momen H. Odeh"} />
        </div>
        <div>
          <Text text={"2023/12/25 10:12"} />
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
