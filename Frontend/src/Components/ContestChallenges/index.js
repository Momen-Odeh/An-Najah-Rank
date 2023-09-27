import React, { useState } from "react";
import useStyles from "./style";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Text from "../Text";
import { Link } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const ContestChallenges = () => {
  const classes = useStyles();
  const [showCreateChallenge, SetShowCreateChallenge] = useState(false);
  return (
    <Container fluid className={classes.Container}>
      <Row className="mb-2">
        <Col>
          <Text
            text={"Contest Challenges"}
            color="#39424e"
            size="24px"
            fontFamily="Open Sans"
            wegiht="bold"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Add challenges to your contest by selecting challenges from our library or create and add your own challenges "
            }
            color="#979FAF"
            size="16px"
            fontFamily="Open Sans"
          />
          <Link to={"/create-challenge"}>here</Link>
          <Text
            text={
              ". To reorder your challenges, simply select the challenge and then drag and drop to the desired location."
            }
            color="#979FAF"
            size="16px"
            fontFamily="Open Sans"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <ButtonRank
            text={"Add Challenge"}
            onClick={() => {
              SetShowCreateChallenge(true);
            }}
          />
          <Modal
            show={showCreateChallenge}
            onHide={() => {
              SetShowCreateChallenge(false);
            }}
            dialogClassName={classes.customModal}
            scrollable
            centered
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Challenge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                You can add a challenge from our public library, a challenge
                that you have created, or a challenge that you have moderator
                access to.
              </div>
              <div className={"Modal mb-3"}>
                <Text text={"Name"} />
                <Form.Control type="text" className={classes.Form} />
              </div>
              <div className={`${Modal} mb-3`}>
                <Text text={"Max Score"} />
                <Form.Control type="number" className={classes.Form} />
              </div>
              <ButtonRank
                text={"Add Challenge"}
                onClick={() => {
                  SetShowCreateChallenge(false);
                }}
              />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <TabTable
            TableHeader={["No.", "Name", "Max Score", ""]}
            TableData={[
              {
                NO: "1",
                Name: "The Sums of Powers",
                maxScore: (
                  <Form.Control
                    type="text"
                    className={`${classes.Form} ${classes.smallWidth}`}
                  />
                ),
                action: (
                  <span>
                    <AiOutlineEdit /> <AiOutlineDelete />
                  </span>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContestChallenges;
