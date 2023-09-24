import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumbs from "../../Components/Breadcrumbs";
import TextRegister from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";

const Challenge = ({}) => {
  const path = [
    {
      title: "All Contests",
      url: "/log-in",
    },
    {
      title: "  DAQ-Summer-2021-Q3",
      url: "",
    },
    {
      title: "DAQ-Spring-2021-Q2",
      url: "",
    },
  ];
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Breadcrumbs path={path} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <TextRegister
            text={"DAQ-Spring-2021-Q2"}
            size="36px"
            wegiht="500"
            height="40px"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <ChallengeTabs />
        </Col>
      </Row>
    </Container>
  );
};

export default Challenge;
