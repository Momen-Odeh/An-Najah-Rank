import React, { useState } from "react";
import CreateChallengeDetails from "../../Components/CreateChallengeDetails";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import useStyles from "./style";
const CreateChallenge = () => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row className="m-2">
        <Breadcrumbs />
      </Row>
      <Row className="m-2 ">
        <Text
          text={"Details"}
          size="26px"
          fontFamily="Open Sans"
          wegiht="600"
          color="#0e141e"
        />
      </Row>
      <Row className="m-2">
        <CreateChallengeDetails operation={"create"} details={null} />
      </Row>
    </Container>
  );
};

export default CreateChallenge;
