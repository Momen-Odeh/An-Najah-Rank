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
import InputFiledRank from "../InputFiledRank";
import ModalRank from "../ModalRank";
import { validateNumber } from "../../Utils/Validation";
import { toastError } from "../../Utils/toast";
const ContestChallenges = ({ challengesData, challengesContest }) => {
  const { contestId } = useParams();
  const [deleteModal, setDeleteModal] = useState({ show: false });
  const classes = useStyles();
  const [oldChallengeId, setOldChallengeId] = useState(null);
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
  const [search, setSearch] = useState("");
  const [TableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ SuggestionsInput: null });
  useEffect(() => {
    setChallenges(
      challengesData
        ?.filter(
          (item) =>
            !challengesContest.some(
              (chCoItem) => chCoItem.name === item.name + " id= " + item.id
            )
        )
        .map((item) => item.name + " id= " + item.id)
    );
  }, [challengesData, challengesContest]);
  useEffect(() => {
    setTableData(challengesContest);
  }, [challengesContest]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
  const handleChallengeInfo = () => {
    const challenge_id = challengesData?.filter(
      (item) => item.name + " id= " + item.id === newChallenge.name
    )[0]?.id;

    if (!challenge_id) return null;

    return challenge_id;
  };
  const handelAddNewChallenge = async () => {
    const challenge_id = handleChallengeInfo();

    setErrorMsg({
      SuggestionsInput: !(newChallenge.name.length >= 3)
        ? "challenge name must contain at least 3 characters"
        : challenge_id === null
        ? "challenge not exist in your challenges"
        : null,
      maxScore:
        !validateNumber(newChallenge.maxScore) ||
        newChallenge.maxScore.length === 0
          ? "please enter max score as number"
          : null,
    });
    if (
      newChallenge.name.length >= 3 &&
      challenge_id !== null &&
      validateNumber(newChallenge.maxScore) &&
      newChallenge.maxScore.length !== 0
    ) {
      const challengeContest = {
        challenge_id: challenge_id,
        contest_id: contestId,
        max_score: newChallenge.maxScore,
      };
      try {
        setLoading(true);
        await axios.post(
          "http://localhost:5000/contests-challenges",
          challengeContest
        );
        setTableData([...TableData, { ...newChallenge, id: challenge_id }]);
        SetNewChallenge({
          id: null,
          name: "",
          maxScore: "",
        });
        SetShowCreateChallenge({
          ...showCreateChallenge,
          value: false,
        });
        setLoading(false);

        setChallenges(
          challenges.filter((item) => item.split("=")[1] != challenge_id)
        );
      } catch (error) {
        toastError(error.response.data.message);
        setLoading(false);
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
    setOldChallengeId(TableData[index].id);
    SetNewChallenge({
      id: TableData[index].id,
      name: TableData[index].name,
      maxScore: TableData[index].maxScore,
    });
  };
  const handleRemoveTableData = async (indexEx) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/contests-challenges?challenge_id=${TableData[indexEx].id}&contest_id=${contestId}`
      );
      setTableData(TableData.filter((element, index) => index !== indexEx));
      setLoading(false);
      setDeleteModal({ ...deleteModal, show: false });
      setChallenges([...challenges, TableData[indexEx].name]);
    } catch (error) {
      toastError(error.response.data.message);
      setLoading(false);
      setDeleteModal({ ...deleteModal, show: false });
    }
  };

  const handleAplayEditTableData = async () => {
    const challenge_id = handleChallengeInfo();
    setErrorMsg({
      SuggestionsInput: !(newChallenge.name.length >= 3)
        ? "challenge name must contain at least 3 characters"
        : challenge_id === null
        ? "challenge not exist in your challenges"
        : null,
      maxScore:
        !validateNumber(newChallenge.maxScore) ||
        newChallenge.maxScore.length === 0
          ? "please enter max score as number"
          : null,
    });
    if (
      newChallenge.name.length >= 3 &&
      challenge_id !== null &&
      validateNumber(newChallenge.maxScore) &&
      newChallenge.maxScore.length !== 0
    ) {
      const challengeContest = {
        old_challenge_id: oldChallengeId,
        challenge_id: challenge_id,
        contest_id: contestId,
        max_score: newChallenge.maxScore,
      };
      try {
        setLoading(true);
        await axios.put(
          `http://localhost:5000/contests-challenges`,
          challengeContest
        );
        TableData[showCreateChallenge.index].name = newChallenge.name;
        TableData[showCreateChallenge.index].maxScore = newChallenge.maxScore;
        TableData[showCreateChallenge.index].id = challenge_id;
        setTableData(TableData);
        SetShowCreateChallenge({
          value: false,
          mode: "add",
        });
        SetNewChallenge({
          id: null,
          name: "",
          maxScore: "",
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        toastError(error.response.data.message);

        setLoading(false);
      }
    }
  };
  //

  //
  const Data = TableData.filter((word) =>
    word.name?.toLowerCase().includes(search.toLowerCase())
  ).map((item, index) => {
    return {
      NO: index,
      name: item.name,
      maxScore: item.maxScore,
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
            onClick={() =>
              setDeleteModal({
                ...deleteModal,
                show: true,
                index: index,
                name: item.name,
              })
            }
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
            size="26px"
            fontFamily="Open Sans"
            wegiht="600"
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
          <Link to={"/administration/challenges/create-challenge"}>here</Link>
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
      <Row className={`${classes.Row} mb-3`}>
        <Col>
          <InputFiledRank
            type="text"
            placeholder="Type username to search"
            width={"250px"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Col>
        <Col xs={"auto"}>
          <ButtonRank
            text={"Add Challenge"}
            onClick={() => {
              SetShowCreateChallenge({ ...showCreateChallenge, value: true });
            }}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <TabTable
            TableHeader={TableHeader}
            TableData={Data}
            url={Data.map(
              (item) =>
                "/administration/challenges/" +
                Number(item.name.split("=")[1]) +
                "/details"
            )}
          />
        </Col>
      </Row>

      <ModalRank
        title={
          showCreateChallenge.mode == "edit" ? "Edit" : "Add" + " Challenge"
        }
        show={showCreateChallenge.value}
        onHide={() => {
          SetShowCreateChallenge({
            ...showCreateChallenge,
            value: false,
            mode: "add",
          });
          SetNewChallenge({
            id: null,
            name: "",
            maxScore: "",
          });
          setErrorMsg({
            SuggestionsInput: null,
            maxScore: null,
          });
        }}
        footer={
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
        }
      >
        <div className="mb-3">
          You can {showCreateChallenge.mode == "edit" ? "edit" : "add"} a
          challenge from our public library, a challenge that you have created,
          or a challenge that you have moderator access to.
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
            msgInput={{ errorMsg, setErrorMsg }}
            loadingVal={{ loading, setLoading }}
            value={newChallenge.name}
          />
        </div>
        <div className={`${Modal} mb-3`}>
          <Text text={"Max Score"} />
          <InputFiledRank
            // className={classes.Form}
            name="maxScore"
            value={newChallenge.maxScore}
            msg={errorMsg.maxScore}
            onChange={(e) => {
              handelStateChanges(e, newChallenge, SetNewChallenge);
            }}
            disabled={loading}
            size="sm"
          />
          {/* <Form.Control /> */}
        </div>
      </ModalRank>
      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title="Delete Challenge"
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={() => handleRemoveTableData(deleteModal.index)}
            disabled={loading}
          />
        }
      >
        <Text
          text={
            "are you sure that want to delete the Challenge with Name " +
            deleteModal.name +
            " from the contest?"
          }
          size="0.9em"
          fontFamily="Open Sans"
          wegiht="600"
          color="#0e141e"
        />
      </ModalRank>
    </Container>
  );
};

export default ContestChallenges;
