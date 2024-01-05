import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Course from "../Course";
import Text from "../Text";
import { ImBooks } from "react-icons/im";
import { PiCodeBold } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import ChallengeShow from "../ChallengeShow";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserStatistics from "../UserStatistics";
const ProfileMain = ({ userCouses, userStatistics }) => {
  const classes = useStyles();
  const [latestChallenge, setLatestChallenge] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id === undefined) {
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
    }
  }, []);
  return (
    <Container fluid className={classes.Container}>
      {userStatistics !== null && (
        <Row className={`${classes.Row} mb-3`}>
          <Col className={`${classes.Col} ${classes.IconContainer}`}>
            <IoStatsChart className={classes.Icon} />
            <Text
              text={"Student Statistics"}
              size="20px"
              fontFamily="Open Sans"
              wegiht="600"
              color="#0e141e"
            />
          </Col>
        </Row>
      )}
      {userStatistics !== null && (
        <Row className={`${classes.Row} mb-4`}>
          <Col className={`${classes.Col}`}>
            <UserStatistics userStatistics={userStatistics} />
          </Col>
        </Row>
      )}
      <Row className={`${classes.Row} mb-3`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <ImBooks className={classes.Icon} />
          <Text
            text={"Courses"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {userCouses.length === 0 ? (
        <Container className="d-flex justify-content-center align-items-center mb-4">
          <Text text={"Courses Not Found"} size="30px" />
        </Container>
      ) : (
        userCouses.map((item, index) => (
          <Row className={`${classes.Row} mb-4`} key={index}>
            <Col className={`${classes.Col}`}>
              <Course {...item} />
            </Col>
          </Row>
        ))
      )}
      {id === undefined && userCouses.length > 0 && (
        <Row className={`${classes.Row} mb-3 `}>
          <Col className={`${classes.Col} ${classes.showAll}`}>
            <Link to={"/courses"} className={classes.linkShow}>
              Show all Courses
            </Link>
          </Col>
        </Row>
      )}
      {id === undefined && latestChallenge.length !== 0 && (
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
      {id === undefined &&
        latestChallenge.map((item, index) => (
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
