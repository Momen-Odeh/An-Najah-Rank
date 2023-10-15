import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import ChallengeInContest from "../../Components/ChallengeInContest";
import Text from "../../Components/Text";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import ChallengeShow from "../../Components/ChallengeShow";
import useStyles from "./style";
import { BiSolidCategory } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import { PiCodeBold } from "react-icons/pi";
import { RxLapTimer } from "react-icons/rx";
import CountDown from "../../Components/CountDown";
const ContestView = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const [challengeContest, setChallengeContest] = useState([]);
  const [contestInfo, setContestInfo] = useState({});
  const clasess = useStyles();
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/contest-info?contest_id=${id}&token=${cookies.token}`
      )
      .then((response) => {
        setChallengeContest(
          response.data.ContestChallenges.map((item, index) => {
            return {
              challengeName: item.name,
              solved: index % 2 === 0 ? true : false,
              statistics: [
                { key: "Difficulty: ", val: item.difficulty },
                { key: "Success Rate: ", val: "100%" },
                { key: "Max Score: ", val: item.maxScore },
              ],
              url: `/challenge/${item.challenge_id}/problem`,
            };
          })
        );
        setContestInfo(response.data.contest);
      });
  }, []);
  const path = [
    { title: "OOP Coures", url: "#" },
    { title: contestInfo.name, url: "#" },
  ];

  return (
    <Container fluid className={clasess.Container}>
      <Row className={`${clasess.Row} mb-5`}>
        <Col className={`${clasess.Col}`}>
          <Breadcrumbs path={path} />
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
        <Col className={`${clasess.Col}`}>
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
        <Col className={`${clasess.Col}`}>
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
