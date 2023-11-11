import React, { useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import ChallengeInContest from "../ChallengeInContest";
import Text from "../Text";
import ChallengeShow from "../ChallengeShow";

import InputFiledRank from "../InputFiledRank";
import { useNavigate } from "react-router-dom";
const ContestsInCourse = ({
  contests,
  isAdmin,
  handleAddContest,
  courseId,
}) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [contest, setContest] = useState({
    contestName: "",
  });
  const { contestName } = contest;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContest({
      ...contest,
      [name]: value,
    });
  };
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
      {contests.map((item, index) => (
        <Row className=" mt-3" key={index}>
          <Col>
            <ChallengeShow {...item} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ContestsInCourse;
