import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../../Components/Text";
import useStyles from "./style";
import { PiCodeBold } from "react-icons/pi";
import ChallengeShow from "../../Components/ChallengeShow";

const ChallengesInContest = ({ challengeContest }) => {
  const classes = useStyles();
  return (
    <>
      <Row className={`${classes.Row} mb-3`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <PiCodeBold className={classes.Icon} />
          <Text
            text={"Challenges"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {challengeContest.length === 0 ? (
        <Container className="d-flex justify-content-center align-items-center mt-4">
          <Text text={"Challenges Not Found"} size="30px" />
        </Container>
      ) : (
        challengeContest.map((item, index) => (
          <Row className={`${classes.Row} mb-4`} key={index}>
            <Col className={`${classes.Col}`}>
              <ChallengeShow {...item} />
            </Col>
          </Row>
        ))
      )}
    </>
  );
};

export default ChallengesInContest;
