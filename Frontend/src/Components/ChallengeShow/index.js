import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Text from "../Text";
import ButtonRank from "../ButtonRank";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CountDown from "../CountDown";
const ChallengeShow = ({ Name, solved, statistics, url, endDate }) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
          {endDate && (
            <Col className={`${classes.CountDownCol} `}>
              <CountDown endDate={endDate} />
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
              text={solved ? "Try Again" : "Solve Challenge"}
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
