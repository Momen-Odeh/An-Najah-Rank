import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Text from "../Text";
import UserLimitAccess from "../UserLimitAccess";
import useStyle from "./Style";
import SuggestionsInput from "../SuggestionsInput";
import ButtonRank from "../ButtonRank";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CancelModeratorsBtn from "../CancelModeratorsBtn";
import ModalRank from "../ModalRank";
const Moderators = ({ Owner, moderatorsData, suggestionModerators }) => {
  const classes = useStyle();
  const { id } = useParams();
  const [moderators, setModerators] = useState([]);
  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState({ moderators: null });
  const [loading, setLoading] = useState(false);
  const suggestionData = (suggestionModerators || [])
    .filter(
      (item) =>
        !moderators.some((moderatorItem) => moderatorItem.email === item.email)
    )
    .map((item) => item.name + " | " + item.email);
  useEffect(() => {
    setModerators(moderatorsData);
  }, [moderatorsData]);
  const handleAdd = async () => {
    try {
      if (input.trim() !== "") {
        const newModerator = suggestionModerators?.filter(
          (item) => item.name + " | " + item.email === input.trim()
        );
        if (newModerator[0]) {
          setLoading(true);
          await axios.post(`/course_moderators`, {
            courseNumber: id,
            stuffNumber: newModerator[0].universityNumber,
          });
          setModerators([...moderators, newModerator[0]]);
        } else {
          setErrorMsg({ moderators: "Not Correct User, Try again" });
        }
        setInput("");
        setLoading(false);
      } else {
        setErrorMsg({ moderators: "please enter moderator name" });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleRemoveModerator = async (idx) => {
    const updatedModerators = moderators.filter((mo, index) => index !== idx);
    try {
      setLoading(true);
      await axios.delete(`/course_moderators`, {
        params: {
          courseNumber: id,
          stuffNumber: moderators[idx].universityNumber,
        },
      });
      setModerators(updatedModerators);
      setLoading(false);
      setDeleteModal({ show: false });
    } catch (error) {
      console.log(error);
      setDeleteModal({ show: false });
      setLoading(false);
    }
  };
  const [deleteModal, setDeleteModal] = useState({ show: false });
  return (
    <Container>
      <Row>
        <Col>
          <Text
            fontFamily="Open Sans"
            text={"Moderators"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
      </Row>
      <Row className={classes.RowAddModerators}>
        <Col className={classes.ColAddModerators}>
          <SuggestionsInput
            data={suggestionData}
            value={input}
            handleChange={(val) => {
              setInput(val);
            }}
            msgInput={{ errorMsg, setErrorMsg }}
            loadingVal={{ loading, setLoading }}
          />
        </Col>
        <Col xs="auto">
          <ButtonRank
            text={"Add"}
            size="14px"
            onClick={handleAdd}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className="m-1">
        <Text
          wegiht={"300"}
          size="14px"
          color={"#979faf"}
          text={`Enter moderator's name. Moderators can edit this course.`}
        />
      </Row>
      <Row className={classes.RowNoWrap}>
        <Col xs="auto" className={classes.BtnCol}></Col>
        <Col>
          <UserLimitAccess
            userName={Owner.name}
            email={Owner.email}
            access={"owner"}
          />
        </Col>
      </Row>
      {moderators?.map((item, index) => (
        <Row key={index} className={`align-items-center ${classes.RowNoWrap}`}>
          <Col xs="auto" className={classes.BtnCol}>
            <CancelModeratorsBtn
              onClick={() =>
                setDeleteModal({ show: true, index: index, name: item.name })
              }
            />
          </Col>
          <Col>
            <UserLimitAccess
              userName={item.name}
              email={item.email}
              access={"moderator"}
            />
          </Col>
        </Row>
      ))}
      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title="Delete Moderator"
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={() => handleRemoveModerator(deleteModal.index)}
            disabled={loading}
          />
        }
      >
        <Text
          text={
            "are you sure that want to delete the moderator " +
            deleteModal.name +
            " from the Moderators list?"
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

export default Moderators;
