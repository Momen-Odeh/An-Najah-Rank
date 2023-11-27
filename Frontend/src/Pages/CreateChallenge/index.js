import React, { useState } from "react";
import CreateChallengeDetails from "../../Components/CreateChallengeDetails";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import useStyles from "./style";
const CreateChallenge = () => {
  const [details, setDetails] = useState({
    difficulty: "Easy",
    name: null,
    description: null,
    problemStatement: null,
    inputFormat: null,
    constraints: null,
    outputFormat: null,
    tags: [],
  });

  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value } = e.target;
      console.log(details);
      setDetails({ ...details, [name]: value });
    } else {
      setDetails({ ...details, [nameVal]: val });
      console.log(details);
    }
  };
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
        <CreateChallengeDetails
          operation={"create"}
          details={details}
          handleChange={handleChange}
        />
      </Row>
    </Container>
  );
};

export default CreateChallenge;
