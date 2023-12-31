import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Text from "../Text";
import ButtonRank from "../ButtonRank";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CountDown from "../CountDown";
import userContext from "../../Utils/userContext";
const ChallengeShow = ({
  Name,
  solved,
  tried,
  statistics,
  url,
  endDate,
  startDate,
  isContest = false,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { activeUser } = useContext(userContext);
  const currentTime = new Date();
  const startTime = new Date(startDate);
  const [completCount, setCompletCount] = useState(
    activeUser.role === "professor" || activeUser.role === "admin"
      ? false
      : startTime > currentTime
  );

  // console.log(startTime, "---------------", currentTime);
  // console.log(
  //   "comparison start > currentTime ",
  //   Name,
  //   "******",
  //   startTime > currentTime
  // );

  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.RowChallengeShow}>
        <Row className="mb-3">
          <Col className={`${classes.ColTitle}`} xs={"auto"}>
            <Text text={Name} size="20px" fontFamily="Open Sans" wegiht="600" />
            {solved && (
              <BiCheckCircle size={26} color="green" className="ml-4" />
            )}
          </Col>
          {}
          {endDate && (
            <Col className={`${classes.CountDownCol} `}>
              <CountDown
                endDate={endDate}
                startDate={startTime}
                setCompletCount={setCompletCount}
              />
            </Col>
          )}
        </Row>
        <Row className={classes.statisticsRow}>
          {statistics?.map((item, index) => (
            <Col xs={"auto"} key={index} className="mb-1">
              <Text
                text={item.key}
                fontFamily="Open Sans"
                size="14px"
                wegiht="600"
                color="#979faf"
              />
              <Text
                text={item.val}
                fontFamily="Open Sans"
                size="14px"
                wegiht="600"
              />
            </Col>
          ))}
          <Col className={classes.ButtonTry}>
            <ButtonRank
              disabled={completCount}
              text={
                isContest
                  ? "View Contest"
                  : activeUser.role !== "student"
                  ? "View Challenge"
                  : tried
                  ? "Try Again"
                  : "Solve Challenge"
              }
              hoverBackgroundColor="#0e141e"
              onClick={() => navigate(url)}
            />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ChallengeShow;
