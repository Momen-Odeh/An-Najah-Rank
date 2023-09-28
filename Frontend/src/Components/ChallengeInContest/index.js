import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import Text from "../Text";
import useStyle from "./Style";
import { BiCheckCircle } from "react-icons/bi";
const ChallengeInContest = ({
  solved,
  challengeName,
  successRate,
  maxScore,
  difficulty,
  challengeUrl
}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <Container fluid className={`${classes.Container} m-0`}>
      <Row className="m-2 mt-3">
        <Col className="d-flex  align-items-center">
          {solved && <BiCheckCircle size={26} color="green" className="m-1" />}
          <Link className={classes.Link} to={challengeUrl}>
            <Text
              text={challengeName}
              size={"24px"}
              fontFamily={"OpenSans"}
              color={solved ? "#82dea3" : "#2ec866"}
              wegiht={solved ? "400" : "400"}
            />
          </Link>
        </Col>
      </Row>
      <div className="d-flex justify-content-between align-items-center m-2">
        <div>
          <div className="d-flex align-items-start">
            <div className="m-2">
              <Text text={"Success Rate: "} wegiht={400} color={"#979faf"} />
              <Text wegiht={400} color={"#39424e"} text={successRate} />
            </div>
            <div className="m-2">
              <Text text={"Max Score: "} wegiht={400} color={"#979faf"} />
              <Text wegiht={400} color={"#39424e"} text={maxScore} />
            </div>
            <div className="m-2">
              <Text text={"Difficulty: "} wegiht={400} color={"#979faf"} />
              <Text wegiht={400} color={"#39424e"} text={difficulty} />
            </div>
          </div>
        </div>
        <div>
          <ButtonRank
            color={solved ? "#39424E" : "white"}
            text={solved ? "Try Again" : "Solve Challenge"}
            backgroundColor={solved ? "#f0f0f4" : "#1cb557"}
            hoverBackgroundColor={solved ? "#1cb557" : "green"}
            onClick={()=>navigate(challengeUrl)}
          />
        </div>
      </div>
    </Container>
  );
};

export default ChallengeInContest;
