import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Course from "../Course";
import Text from "../Text";
import { ImBooks } from "react-icons/im";
import { PiCodeBold } from "react-icons/pi";
import ChallengeShow from "../ChallengeShow";
const ProfileMain = ({ userCouses }) => {
  const classes = useStyles();
  const LatestChallenge = [
    {
      Name: "An-Najah Rank test2",
      solved: true,
      statistics: [
        { key: "Difficulty: ", val: "Medium" },
        { key: "Success Rate: ", val: "100%" },
        { key: "Max Score: ", val: 100 },
      ],
      url: "#test2",
    },
    {
      Name: "An-Najah Rank test2",
      solved: false,
      statistics: [
        { key: "Difficulty: ", val: "Medium" },
        { key: "Success Rate: ", val: "100%" },
        { key: "Max Score: ", val: 100 },
      ],
      url: "#test2",
    },
    {
      Name: "An-Najah Rank test2",
      solved: false,
      statistics: [
        { key: "Difficulty: ", val: "Medium" },
        { key: "Success Rate: ", val: "100%" },
        { key: "Max Score: ", val: 100 },
      ],
      url: "#test2",
    },
  ];
  return (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.Row} mb-3`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <ImBooks className={classes.Icon} />
          <Text
            text={"My Courses"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {userCouses.map((item, index) => (
        <Row className={`${classes.Row} mb-4`} key={index}>
          <Col className={`${classes.Col}`}>
            <Course {...item} />
          </Col>
        </Row>
      ))}
      <Row className={`${classes.Row} mt-5 mb-3`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <PiCodeBold className={classes.Icon} />
          <Text
            text={"Latest Challenges"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {LatestChallenge.map((item, index) => (
        <Row className={`${classes.Row} mb-4`} key={index}>
          <Col className={`${classes.Col}`}>
            <ChallengeShow {...item} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProfileMain;
