import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import ContestsDetalis from "../../Components/ContestDetails";
import useStyles from "./style";
const path = [
  {
    title: "Manage Contests",
    url: "/log-in",
  },
  {
    title: "create contest",
    url: "",
  },
];

const CreateContest = () => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.Container}>
      <Row className={`mt-2 `}>
        <Col>
          <Breadcrumbs path={path} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ContestsDetalis operation={"create"} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateContest;
