import React, { useState } from "react";
import Details from "../../Components/Details";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
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
  const path = [
    { title: "Manage Challenges", url: "/administration/challenges" },
    { title: "Create Challenge", url: "#" },
  ];
  return (
    <>
      <Container>
        <Row className="m-2">
          <Breadcrumbs path={path} />
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row className="m-2 mt-4 mb-4">
          <Text
            text={"Details"}
            size={"30px"}
            fontFamily={"OpenSans"}
            color={"#39424e"}
          />
        </Row>
        <Row className="m-2">
          <Details
            operation={"create"}
            details={details}
            handleChange={handleChange}
          />
        </Row>
      </Container>
    </>
  );
};

export default CreateChallenge;
