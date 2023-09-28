import React, { useState } from "react";
import useStyles from "./style";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Text from "../Text";
import { Link } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { BiTrash } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import handelStateChanges from "../../Utils/handelStateChanges";
const ContestChallenges = () => {
  const classes = useStyles();
  const TableHeader = ["No.", "Name", "Max Score", ""];
  const [showCreateChallenge, SetShowCreateChallenge] = useState({
    value: false,
    mode: "add",
  });
  const [newChallenge, SetNewChallenge] = useState({
    name: "",
    maxScore: "",
  });
  const [TableData, setTableData] = useState([]);
  const handelAddNewChallenge = () => {
    setTableData([...TableData, newChallenge]);
    SetNewChallenge({
      name: "",
      maxScore: "",
    });
    SetShowCreateChallenge({
      ...showCreateChallenge,
      value: false,
    });
  };

  const handleEditTableData = (index) => {
    SetShowCreateChallenge({
      ...showCreateChallenge,
      value: true,
      mode: "edit",
      index: index,
    });
    SetNewChallenge({
      name: TableData[index].name,
      maxScore: TableData[index].maxScore,
    });
  };
  const handleRemoveTableData = (indexEx) => {
    setTableData(TableData.filter((element, index) => index !== indexEx));
  };
  const handleAplayEditTableData = () => {
    TableData[showCreateChallenge.index].name = newChallenge.name;
    TableData[showCreateChallenge.index].maxScore = newChallenge.maxScore;
    setTableData(TableData);
    SetShowCreateChallenge({
      value: false,
      mode: "add",
    });
  };
  const Data = TableData.map((item, index) => {
    return {
      NO: index,
      ...item,
      action: (
        <span>
          <HiPencil
            size={30}
            color="#949494"
            className={classes.iconColor}
            onClick={() => handleEditTableData(index)}
          />
          <BiTrash
            size={30}
            color="#949494"
            className={classes.iconColor}
            onClick={() => handleRemoveTableData(index)}
          />
        </span>
      ),
    };
  });
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
              SetShowCreateChallenge({ ...showCreateChallenge, value: true });
            }}
          />
          <Modal
            show={showCreateChallenge.value}
            onHide={() => {
              SetShowCreateChallenge({
                ...showCreateChallenge,
                value: false,
                mode: "add",
              });
              SetNewChallenge({
                name: "",
                maxScore: "",
              });
            }}
            dialogClassName={classes.customModal}
            scrollable
            centered
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {showCreateChallenge.mode == "edit" ? "Edit" : "Add"} Challenge
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                You can {showCreateChallenge.mode == "edit" ? "edit" : "add"} a
                challenge from our public library, a challenge that you have
                created, or a challenge that you have moderator access to.
              </div>
              <div className={"Modal mb-3"}>
                <Text text={"Name"} />
                <Form.Control
                  type="text"
                  className={classes.Form}
                  name="name"
                  value={newChallenge.name}
                  onChange={(e) => {
                    handelStateChanges(e, newChallenge, SetNewChallenge);
                  }}
                />
              </div>
              <div className={`${Modal} mb-3`}>
                <Text text={"Max Score"} />
                <Form.Control
                  type="number"
                  className={classes.Form}
                  name="maxScore"
                  value={newChallenge.maxScore}
                  onChange={(e) => {
                    handelStateChanges(e, newChallenge, SetNewChallenge);
                  }}
                />
              </div>
              <ButtonRank
                text={`${
                  showCreateChallenge.mode == "edit" ? "Edit" : "Add"
                } Challenge`}
                onClick={
                  showCreateChallenge.mode == "edit"
                    ? handleAplayEditTableData
                    : handelAddNewChallenge
                }
              />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <TabTable TableHeader={TableHeader} TableData={Data} />
        </Col>
      </Row>
    </Container>
  );
};

export default ContestChallenges;
