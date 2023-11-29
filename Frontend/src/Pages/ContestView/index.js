import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
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
import Loader from "../../Components/Loader";
const ContestView = () => {
  const { id, contestId } = useParams();
  const [challengeContest, setChallengeContest] = useState([]);
  const [contestInfo, setContestInfo] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    axios
      .get(`/contest-info`, {
        params: { courseId: id, contest_id: contestId, contestView: true },
      })
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
        setLoadingPage(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //************* guard done ************************ */
          if (error?.response?.data?.message === "Access Denied") {
            toastError("Invalid Access");
            navigate("/");
          } else {
            toastError("Invalid Access");
            navigate("/log-in");
          }
        } else setLoadingPage(false);
      });
  }, []);

  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.Row} mb-5`}>
        <Col className={`${classes.Col}`}>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-5`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <BiSolidCategory className={classes.Icon} />
          <Text
            text={contestInfo.name}
            size="1.8em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-1`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <AiFillFileText className={classes.Icon} />
          <Text
            text={"Description"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-2`}>
        <Col className={`${classes.Col} ${classes.descritionCol}`}>
          <span
            className={classes.descrition}
            dangerouslySetInnerHTML={{
              __html: contestInfo.description,
            }}
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-2`}>
        <Col className={`${classes.Col} ${classes.IconContainer}`}>
          <RxLapTimer className={classes.Icon} />
          <Text
            text={"Remaining time"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-2`}>
        <Col className={`${classes.Col} ${classes.ColDWN}`}>
          <CountDown endDate={new Date(contestInfo.endTime)} />
        </Col>
      </Row>

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
      {challengeContest.map((item, index) => (
        <Row className={`${classes.Row} mb-4`} key={index}>
          <Col className={`${classes.Col}`}>
            <ChallengeShow {...item} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ContestView;
