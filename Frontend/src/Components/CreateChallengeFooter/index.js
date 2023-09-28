import React from "react";
import { Col } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import useStyle from "./Style";
const CreateChallengeFooter = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.fixedContainer}>
        <Col className="d-flex justify-content-end">
          <ButtonRank text={"Cancel Changes"} />
          <span className="m-2"></span>
          <ButtonRank
            text={"Save Changes"}
            backgroundColor="#1cb557"
            hoverBackgroundColor="green"
            color="white"
          />
        </Col>
      </div>
    </div>
  );
};

export default CreateChallengeFooter;
