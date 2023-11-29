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
import axios from "axios";
import { toastError } from "../../Utils/toast";
import Loader from "../../Components/Loader";
const Contests = () => {
  const classes = useStyles();
  const { id, contestId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: null,
    description: null,
    startTime: null,
    hasEndTime: false,
    endTime: null,
  });
  const [challenges, setChallenges] = useState([]);
  const [challengesContest, setChallengesContest] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    axios
      .get(`/contest-info`, {
        params: { contest_id: contestId, courseId: id },
      })
      .then((res) => {
        setDetails({
          name: res.data.contest.name,
          description: res.data.contest.description,
          startTime: res.data.contest.startTime,
          hasEndTime: res.data.contest.hasEndTime,
          endTime: res.data.contest.endTime ? res.data.contest.endTime : null,
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
        console.log(error);
      });
  }, []);

  const tabContent = [
    {
      eventKey: "Details",
      title: "Details",
      TabComponent: <ContestsDetalis operation={"update"} data={details} />,
      urlPattern: `/administration/courses/${id}/contests/${contestId}/details`,
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
      urlPattern: `/administration/courses/${id}/contests/${contestId}/challenges`,
    },
  ];
  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={`mt-2 ${classes.maxWidth}`}>
        <Col>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className={`mb-4 ${classes.maxWidth}`}>
        <Col>
          <Text text={details.name} size="36px" wegiht="500" height="40px" />
        </Col>
      </Row>
      <Row className={`mb-4 ${classes.maxWidth}`}>
        <Col>
          <ChallengeTabs ListTabs={tabContent} />
        </Col>
      </Row>
    </Container>
  );
};

export default Contests;
