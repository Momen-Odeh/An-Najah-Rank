import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import Text from "../Text";
import ChallengeShow from "../ChallengeShow";
import { useNavigate } from "react-router-dom";
const ContestsInCourse = ({ contests, isAdmin, courseId }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
          <Text
            text={"Contests"}
            size="1.3em"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
        {isAdmin && (
          <Col className="d-flex justify-content-end align-items-start">
            <ButtonRank
              text={"Add Contest"}
              hoverBackgroundColor="#0e141e"
              onClick={() => {
                navigate(`/administration/courses/${courseId}/contests`);
              }}
            />
          </Col>
        )}
      </Row>
      {contests.length === 0 ? (
        <Container className="d-flex justify-content-center align-items-center mb-4">
          <Text text={"Contests Not Found"} size="30px" />
        </Container>
      ) : (
        contests?.map((item, index) => (
          <Row className=" mt-3" key={index}>
            <Col>
              <ChallengeShow {...item} isContest />
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default ContestsInCourse;
