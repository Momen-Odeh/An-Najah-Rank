import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import ChallengeInContest from "../../Components/ChallengeInContest";
import Text from "../../Components/Text";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ChallengeShow from "../../Components/ChallengeShow";
import useStyles from "./style";
import { BiSolidCategory } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import { PiCodeBold } from "react-icons/pi";
import { RxLapTimer } from "react-icons/rx";
import CountDown from "../../Components/CountDown";
import { toastError } from "../../Utils/toast";
const ContestView = () => {
  const { id, contestId } = useParams();
  const [challengeContest, setChallengeContest] = useState([]);
  const [contestInfo, setContestInfo] = useState({});
  const clasess = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/accessCourse", {
        params: {
          courseNumber: id,
        },
      })
      .then((response1) => {
        axios
          .get(`/contest-info`, { params: { contest_id: contestId } })
          .then((response) => {
            setChallengeContest(
              response.data.ContestChallenges.map((item, index) => {
                return {
                  Name: item.name,
                  solved: index % 2 === 0 ? true : false,
                  statistics: [
                    { key: "Difficulty: ", val: item.difficulty },
                    { key: "Success Rate: ", val: "100%" },
                    { key: "Max Score: ", val: item.maxScore },
                  ],
                  url: `/courses/${id}/contests/${contestId}/challenges/${item.challenge_id}/problem`,
                };
              })
            );
            setContestInfo(response.data.contest);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              navigate("/log-in");
              toastError("Invalid Access");
            }
          });
      })
      .catch((error1) => {
        console.log(error1);
        if (error1.response.status === 401) {
          toastError("Invalid Access");
          if (error1.response.data.Valid === undefined) {
            navigate("/log-in");
          } else {
            navigate("/");
          }
        }
      });
  }, []);

  return (
    <Container fluid className={clasess.Container}>
      <Row className={`${clasess.Row} mb-5`}>
        <Col className={`${clasess.Col}`}>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-5`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <BiSolidCategory className={clasess.Icon} />
          <Text
            text={contestInfo.name}
            size="1.8em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-1`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <AiFillFileText className={clasess.Icon} />
          <Text
            text={"Description"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col} ${clasess.descritionCol}`}>
          <span
            className={clasess.descrition}
            dangerouslySetInnerHTML={{
              __html: contestInfo.description,
            }}
          />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <RxLapTimer className={clasess.Icon} />
          <Text
            text={"Remaining time"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${clasess.Row} mb-2`}>
        <Col className={`${clasess.Col} ${clasess.ColDWN}`}>
          <CountDown endDate={new Date(contestInfo.endTime)} />
        </Col>
      </Row>

      <Row className={`${clasess.Row} mb-3`}>
        <Col className={`${clasess.Col} ${clasess.IconContainer}`}>
          <PiCodeBold className={clasess.Icon} />
          <Text
            text={"Challenges"}
            size="20px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      {challengeContest.map((item, index) => (
        <Row className={`${clasess.Row} mb-4`} key={index}>
          <Col className={`${clasess.Col}`}>
            <ChallengeShow {...item} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ContestView;
