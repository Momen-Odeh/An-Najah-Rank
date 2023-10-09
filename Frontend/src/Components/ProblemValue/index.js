import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TextRegister from "../Text";
import { Link } from "react-router-dom";
import useStyles from "./style";
import ChallengeContext from "../../Utils/ChallengeContext";

const ProblemValue = () => {
  const classes = useStyles();
  const context = useContext(ChallengeContext);
  return (
    <Container fluid>
      <Row>
        <Col className={classes.Col}>
          <TextRegister
            text={"Submition: "}
            size="16px"
            wegiht="400"
            color="#979FAF"
          />
          <Link>30</Link>
        </Col>
      </Row>
      <Row>
        <Col className={classes.Col}>
          <TextRegister
            text={"Max Score: "}
            size="16px"
            wegiht="400"
            color="#979FAF"
          />
          <TextRegister text={"35"} size="16px" wegiht="100" color="#39424E" />
        </Col>
      </Row>
      <Row>
        <Col className={classes.Col}>
          <TextRegister
            text={"Difficulty: "}
            size="16px"
            wegiht="400"
            color="#979FAF"
          />
          <TextRegister
            text={context.challengeData.difficulty}
            size="16px"
            wegiht="100"
            color="#39424E"
          />
        </Col>
      </Row>
      <Row>
        <Col className={classes.Col}>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default ProblemValue;
