import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStyles from "./style";
import { BiSolidCategory } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import { RxLapTimer } from "react-icons/rx";
import CountDown from "../../Components/CountDown";
import { toastError } from "../../Utils/toast";
import Loader from "../../Components/Loader";
import ChallengeTabs from "../../Components/ChallengTabs";
import TabTable from "../../Components/TabTable";
import ChallengesInContest from "./ChallengesInContest";
const ContestView = () => {
  const { id, contestId } = useParams();
  const [challengeContest, setChallengeContest] = useState([]);
  const [contestInfo, setContestInfo] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(true);
  const [contestsResult, setContestsResult] = useState([]);
  const [role, setRole] = useState();
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
              solved: item.solved,
              tried: item.tried,
              statistics: [
                { key: "Difficulty: ", val: item.difficulty },
                { key: "Success Rate: ", val: item.challengeRate + " %" },
                { key: "Max Score: ", val: item.maxScore },
              ],
              maxScoreForChallenge: item.maxScore,
              url: `/courses/${id}/contests/${contestId}/challenges/${item.challenge_id}/problem`,
            };
          })
        );
        setContestInfo(response.data.contest);
        setContestsResult(
          response.data.contestGrades.map((item) => {
            const challengeMarks = response.data.ContestChallenges.map(
              (c, index) => ({
                [`ch${index}`]: item.challengeResults[c.challenge_id]
                  ? item.challengeResults[c.challenge_id]
                  : "Not Solved",
              })
            );
            const challengeMarksObject = Object.assign({}, ...challengeMarks);
            return {
              UniversityNumber: item.studentId,
              Name: item.studentName,
              ...challengeMarksObject,
              TotalResult: item.totalResult,
            };
          })
        );
        setRole(response.data.role);
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

  const tabContent = [
    {
      eventKey: "Challenges",
      title: "Challenges",
      TabComponent: <ChallengesInContest challengeContest={challengeContest} />,
    },
    {
      eventKey: "Grades",
      title: "Grades",
      TabComponent: (
        <TabTable
          TableHeader={[
            "University Number",
            "Name",
            ...challengeContest.map(
              (c) => c.Name + `(${c.maxScoreForChallenge})`
            ),
            `Total Result(${challengeContest.reduce(
              (sum, challenge) => sum + challenge.maxScoreForChallenge,
              0
            )})`,
          ]}
          TableData={contestsResult}
        />
      ),
    },
  ];

  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.Row} mb-2`}>
        <Col className={`${classes.Col}`}>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className={`${classes.Row} mb-4`}>
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
      {role === "professor" || role === "admin" ? (
        <ChallengeTabs ListTabs={tabContent} />
      ) : (
        <ChallengesInContest challengeContest={challengeContest} />
      )}
    </Container>
  );
};

export default ContestView;
