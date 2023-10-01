import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs";
import ChallengeInContest from "../../Components/ChallengeInContest";
import Text from "../../Components/Text";
const ContestView = () => {
  const [contest, setContest] = useState({
    name: "Contest Name",
    challenges: [
      {
        challengeName: "An-Najah Rank test1",
        solved: true,
        statistics:[
          {key:"Difficulty: ",val: "Medium"},
          {key:"Success Rate: ",val:"80%"},
          {key:"Max Score: ",val:100}
        ],
        url:'#test1'
      },
      {
        challengeName: "An-Najah Rank test2",
        solved: false,
        statistics:[
          {key:"Difficulty: ",val: "Medium"},
          {key:"Success Rate: ",val:"100%"},
          {key:"Max Score: ",val:100}
        ],
        url:'#test2'
      },
    ],
  });
  const path = [
    { title: "Manage Challenges", url: "#manage challenges" },
    { title: contest.name, url: "#" },
  ];
  return (
    <>
      <Container>
        <Row className="m-2">
          <Col>
            <Breadcrumbs path={path} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row className="m-2">
          <Col>
            <Text text={contest.name} wegiht={500} size={"1.5em"} />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row className="m-2 mt-5">
          <Col>
            <Text
              text={"Challenges"}
              fontFamily={"OpenSans"}
              wegiht="600"
              size="22px"
              color="#39424e"
            />
          </Col>
        </Row>
        {contest.challenges.map((item)=><Row className="m-2 mt-3">
          <Col>
            <ChallengeInContest
              challengeName={item.challengeName}
              solved={item.solved}
              Statistics={item.statistics}
              challengeUrl={item.url}
            />
          </Col>
        </Row>)}
      </Container>
    </>
  );
};

export default ContestView;
