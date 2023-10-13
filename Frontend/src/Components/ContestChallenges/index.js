import React, { useState } from "react";
import useStyles from "./style";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Text from "../Text";
import { Link, useParams } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { BiTrash } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import handelStateChanges from "../../Utils/handelStateChanges";
import SuggestionsInput from "../SuggestionsInput";
import { useEffect } from "react";
import axios from "axios";
const ContestChallenges = ({ challengesData, challengesContest }) => {
  const { id } = useParams();
  const classes = useStyles();
  const [challenges, setChallenges] = useState([]);
  const TableHeader = ["No.", "Name", "Max Score", ""];
  const [showCreateChallenge, SetShowCreateChallenge] = useState({
    value: false,
    mode: "add",
  });
  const [newChallenge, SetNewChallenge] = useState({
    id: null,
    name: "",
    maxScore: "",
  });
  const [TableData, setTableData] = useState([]);
  useEffect(() => {
    setChallenges(challengesData?.map((item) => item.name + " id= " + item.id));
  }, [challengesData]);
  useEffect(() => {
    setTableData(challengesContest);
  }, [challengesContest]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
  const handleChallengeInfo = () => {
    try {
      const challenge_id = challengesData?.filter(
        (item) => item.name + " id= " + item.id === newChallenge.name
      )[0]?.id;
      if (!newChallenge.name) {
        throw new Error("should enter challenge name");
      } else if (!newChallenge.maxScore) {
        throw new Error("should enter max score");
      } else if (!challenge_id) {
        throw new Error("challenge not exist in your challenges");
      }
      return challenge_id;
    } catch (error) {
      setAlertData({ message: error.message, variant: "warning" });
      setShowAlert(true);
      return null;
    }
  };
  const handelAddNewChallenge = async () => {
    const challenge_id = handleChallengeInfo();
    if (challenge_id) {
      const challengeContest = {
        challenge_id: challenge_id,
        contest_id: id,
        max_score: newChallenge.maxScore,
      };
      try {
        await axios.post(
          "http://localhost:5000/contests-challenges",
          challengeContest
        );
        const params = new URLSearchParams(challengeContest);
        const res = await axios.get(
          "http://localhost:5000/contests-challenges-id?" + params.toString()
        );
        setTableData([...TableData, { ...newChallenge, id: res.data.message }]);
        SetNewChallenge({
          id: null,
          name: "",
          maxScore: "",
        });
        SetShowCreateChallenge({
          ...showCreateChallenge,
          value: false,
        });
      } catch (error) {
        setAlertData({
          message: error.response.data.message,
          variant: "danger",
        });
        setShowAlert(true);
      }
    }
  };

  const handleEditTableData = (index) => {
    SetShowCreateChallenge({
      ...showCreateChallenge,
      value: true,
      mode: "edit",
      index: index,
    });
    SetNewChallenge({
      id: TableData[index].id,
      name: TableData[index].name,
      maxScore: TableData[index].maxScore,
    });
  };
  const handleRemoveTableData = async(indexEx) => {
    try {
      await axios.delete(`http://localhost:5000/contests-challenges/${TableData[indexEx].id}`,)
      setTableData(TableData.filter((element, index) => index !== indexEx));
    } catch (error) {
      setAlertData({
        message: error.response.data.message,
        variant: "danger",
      })
      setShowAlert(true);
    }
  };

  const handleAplayEditTableData = async () => {
    const challenge_id = handleChallengeInfo();
    if (challenge_id) {
      const challengeContest = {
        challenge_id: challenge_id,
        contest_id: id,
        max_score: newChallenge.maxScore,
      };
      try {
        await axios.put(
          `http://localhost:5000/contests-challenges/${newChallenge.id}`,
          challengeContest
        );
        TableData[showCreateChallenge.index].name = newChallenge.name;
        TableData[showCreateChallenge.index].maxScore = newChallenge.maxScore;
        setTableData(TableData);
        SetShowCreateChallenge({
          value: false,
          mode: "add",
        });
      } catch (error) {
        setAlertData({
          message: error.response.data.message,
          variant: "danger",
        });
        setShowAlert(true);
      }
    }
  };
  const Data = TableData.map((item, index) => {
    return {
      NO: index,
      name: item.name,
      maxScore: item.maxScore,
      action: (
        <span>
          <HiPencil
            size={30}
            color="#949494"
            className={classes.iconColor }
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
                <SuggestionsInput
                  name={"name"}
                  handleChange={(value) => {
                    SetNewChallenge({ ...newChallenge, name: value });
                  }}
                  placeholder="enter name..."
                  data={challenges}
                  value={newChallenge.name}
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
