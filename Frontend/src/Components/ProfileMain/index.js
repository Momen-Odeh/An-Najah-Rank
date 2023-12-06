import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Course from "../Course";
import Text from "../Text";
import { ImBooks } from "react-icons/im";
import { PiCodeBold } from "react-icons/pi";
import ChallengeShow from "../ChallengeShow";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProfileMain = ({ userCouses }) => {
  const classes = useStyles();
  const [latestChallenge, setLatestChallenge] = useState([]);

  useEffect(() => {
    axios
      .get("/latestChallengesProfile")
      .then((response) => {
        console.log(response.data);
        setLatestChallenge(
          response.data.challenges.map((item, index) => {
            return {
              Name: item.name,
              solved: item.submissionResult === 100,
              statistics: [
                { key: "Difficulty: ", val: item.difficulty },
                { key: "Success Rate: ", val: item.submissionResult + "%" },
                { key: "Max Score: ", val: item.max_score },
              ],
              url: `/courses/${item.courseNumber}/contests/${item.contestId}/challenges/${item.challengeId}/problem`,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
      <Row className={`${classes.Row} mb-3 `}>
        <Col className={`${classes.Col} ${classes.showAll}`}>
          <Link to={"/courses"} className={classes.linkShow}>
            Show all Courses
          </Link>
        </Col>
      </Row>
      {latestChallenge.length !== 0 && (
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
      )}
      {latestChallenge.map((item, index) => (
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
