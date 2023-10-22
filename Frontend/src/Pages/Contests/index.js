import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ContestsDetalis from "../../Components/ContestDetails";
import ContestChallenges from "../../Components/ContestChallenges";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
const Contests = () => {
  const navigate = useNavigate();
  const clasess = useStyles();
  const { id, contestId } = useParams();
  const [cookies, setCookies] = useCookies();
  const [details, setDetails] = useState({
    name: null,
    description: null,
    startTime: null,
    hasEndTime: false,
    endTime: null,
  });
  const [challenges, setChallenges] = useState([]);
  const [challengesContest, setChallengesContest] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/contest-info?contest_id=${contestId}&token=${cookies.token}`
      )
      .then((res) => {
        setDetails({
          name: res.data.contest.name,
          description: res.data.contest.description,
          startTime: new Date(res.data.contest.startTime),
          hasEndTime: !res.data.contest.hasEndTime,
          endTime: res.data.contest.endTime
            ? new Date(res.data.contest.endTime)
            : null,
        });
        setChallenges(
          res.data.myChallenges.map((item, index) => ({
            id: item[0],
            name: item[1],
          }))
        );
        setChallengesContest(
          res.data.ContestChallenges?.map((item, index) => ({
            id: item.challenge_id,
            name: item.name + " id= " + item.challenge_id,
            maxScore: item.maxScore,
          }))
        );
      })
      .catch((error) => {
        // navigate("/");
      });
  }, []);

  const path = [
    {
      title: "Manage Contests",
      url: "/log-in",
    },
    {
      title: details.name,
      url: "#",
    },
  ];

  const tabContent = [
    {
      eventKey: "Details",
      title: "Details",
      TabComponent: <ContestsDetalis operation={"update"} data={details} />,
      urlPattern: `/course/${id}/contests/${contestId}/details`,
    },
    {
      eventKey: "ContestChallenges",
      title: "Challenges",
      TabComponent: (
        <ContestChallenges
          challengesData={challenges}
          challengesContest={challengesContest}
        />
      ),
      urlPattern: `/course/${id}/contests/${contestId}/challenges`,
    },
  ];
  return (
    <>
      <Container fluid className={clasess.Container}>
        <Row className={`mt-2 ${clasess.maxWidth}`}>
          <Col>
            <Breadcrumbs path={path} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container fluid className={clasess.Container}>
        <Row className={`mb-4 ${clasess.maxWidth}`}>
          <Col>
            <Text text={details.name} size="36px" wegiht="500" height="40px" />
          </Col>
        </Row>
        <Row className={`mb-4 ${clasess.maxWidth}`}>
          <Col>
            <ChallengeTabs ListTabs={tabContent} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contests;
