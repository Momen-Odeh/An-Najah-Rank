import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Avatar from "react-avatar";
import Text from "../Text";
import ButtonRank from "../ButtonRank";
import { BiCheckCircle } from "react-icons/bi";
const ChallengeShow = ({ challengeName, solved, statistics, url }) => {
  const clasess = useStyles();
  return (
    <Container fluid className={clasess.Container}>
      <Row className={clasess.RowChallengeShow}>
        <Row>
          <Col className={clasess.ColTitle}>
            {solved && (
              <BiCheckCircle size={26} color="green" className="m-1" />
            )}
            <Text
              text={challengeName}
              size="20px"
              fontFamily="Open Sans"
              wegiht="600"
            />
          </Col>
        </Row>
        <Row className={clasess.statisticsRow}>
          {statistics.map((item, index) => (
            <Col xs={"auto"} key={index}>
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
          <Col className={clasess.ButtonTry}>
            <ButtonRank text={"Try Again"} hoverBackgroundColor="#0e141e" />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ChallengeShow;
