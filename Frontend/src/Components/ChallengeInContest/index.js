import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import Text from "../Text";
import useStyle from "./Style";
import { BiCheckCircle } from "react-icons/bi";
import CountDown from "../CountDown";
const ChallengeInContest = ({
  solved,
  challengeName,
  Statistics,
  challengeUrl,
  endDate = null,
}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <Container fluid className={`${classes.Container} m-0`}>
      <Row className="mt-3 ms-2">
        <Col className="d-flex  align-items-center" md={6}>
          {solved && <BiCheckCircle size={26} color="green" className="m-1" />}
            <Link className={classes.Link} to={challengeUrl}>
              <Text
                text={challengeName}
                size={"20px"}
                fontFamily={"OpenSans"}
                color={solved ? "#82dea3" : "#2ec866"}
                wegiht={solved ? "400" : "400"}
              />
            </Link>
        </Col>
        {endDate && (
          <Col className="d-flex  align-items-center justify-content-end">
            <CountDown endDate={endDate}/>
          </Col>
        )}
      </Row>
      <Row className="d-flex justify-content-between align-items-center mb-2">
        <Col md={9}>
          <Col className="d-flex align-items-start">
            {Statistics.map((item,index) => (
              <div className='m-2'>
                <Text text={item.key} wegiht={400} color={"#979faf"} />
                <Text wegiht={400} color={"#39424e"} text={item.val} />
              </div>
            ))}
          </Col>
        </Col>
        <Col className="d-flex justify-content-end">
          <ButtonRank
            color={solved ? "#39424E" : "white"}
            text={solved ? "Try Again" : "Solve Challenge"}
            backgroundColor={solved ? "#f0f0f4" : "#1cb557"}
            hoverBackgroundColor={solved ? "#1cb557" : "green"}
            onClick={() => navigate(challengeUrl)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeInContest;
