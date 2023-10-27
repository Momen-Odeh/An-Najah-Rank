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
const Moderators = ({ Owner, moderatorsData, suggestionModerators }) => {
  const classes = useStyle();
  const { id } = useParams();
  const [moderators, setModerators] = useState([]);
  const [input, setInput] = useState("");
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
    if (input.trim() !== "") {
      const newModerator = suggestionModerators?.filter(
        (item) => item.name + " | " + item.email === input.trim()
      );
      if (newModerator[0]) {
        await axios.post(`http://localhost:5000/course_moderators`, {
          courseNumber: id,
          stuffNumber: newModerator[0].universityNumber,
        });
        setModerators([...moderators, newModerator[0]]);
      } else {
        alert("enter correct name");
      }
      setInput("");
    }
  };
  const handleRemoveModerator = async (idx) => {
    const updatedModerators = moderators.filter((mo, index) => index !== idx);
    await axios.delete(
      `http://localhost:5000/course_moderators?courseNumber=${id}&stuffNumber=${moderators[idx].universityNumber}`
    );
    setModerators(updatedModerators);
  };
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
          />
        </Col>
        <Col xs="auto">
          <ButtonRank text={"Add"} size="14px" onClick={handleAdd} />
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
            <CancelModeratorsBtn onClick={() => handleRemoveModerator(index)} />
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
    </Container>
  );
};

export default Moderators;
