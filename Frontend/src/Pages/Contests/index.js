import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import ChallengeTabs from "../../Components/ChallengTabs";
import ContestsDetalis from "../../Components/ContestDetails";
import ContestChallenges from "../../Components/ContestChallenges";
import useStyles from "./style";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Contests = () => {
  const clasess = useStyles();
  const { id } = useParams();
  const [cookies, setCookies] = useCookies();
  const [details, setDetails] = useState({
    name: null,
    description: null,
    startTime: null,
    hasEndTime: false,
    endTime: null,
  });
  const [challenges, setChallenges]=useState([])
  const [challengesContest, setChallengesContest]=useState([])
  useEffect(() => {
    axios.get(
      `http://localhost:5000/contest-info?contest_id=${id}&token=${cookies.token}`
    ).then((res)=>{
      setDetails({
        name: res.data.contest[1],
        description: res.data.contest[2],
        startTime: new Date(res.data.contest[3]),
        hasEndTime: !res.data.contest[4],
        endTime: res.data.contest[5]?new Date(res.data.contest[5]):null,
      })
      setChallenges(res.data.myChallenges.map((item, index)=>({
        id: item[0],
        name: item[1],
      })))
      setChallengesContest(res.data.ContestChallenges?.map((item,index)=>({
        id: item[13],
        name: item[1]+" id= "+item[0],
        maxScore: item[12],
      })))
    })
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
      urlPattern: `/contests/${id}/details`,
    },
    {
      eventKey: "ContestChallenges",
      title: "Challenges",
      TabComponent: <ContestChallenges challengesData={challenges} challengesContest={challengesContest} />,
      urlPattern: `/contests/${id}/challenges`,
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
