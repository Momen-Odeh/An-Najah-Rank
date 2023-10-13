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
    <>
      <Container className={classes.Container}>
        <Row className={`mt-2 ${classes.maxWidth}`}>
          <Col>
            <Breadcrumbs path={path} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container className={classes.Container}>
        <Row className={`mb-4 mt-2 ${classes.maxWidth}`}>
          <Col>
            <ContestsDetalis operation={"create"}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateContest;
