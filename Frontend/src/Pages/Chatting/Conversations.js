import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../../Components/Text";
import PersonInfo from "./PersonInfo";
import ModalRank from "../../Components/ModalRank";
import { useState } from "react";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";
import { validateEmail } from "../../Utils/Validation";
const Conversations = ({
  ConversationsData,
  handelSendNewMessage,
  handelChooseConversation,
  activeConversationUsers,
  loading,
}) => {
  const classes = useStyle();
  const [newModal, setNewModal] = useState({
    show: false,
    email: "",
    message: "",
  });
  const [errorMsg, setErrorMsg] = useState({ email: null, message: null });
  const handelValidationSendNewMsg = () => {
    setErrorMsg({
      email: !validateEmail(newModal.email) ? "please enter valid email" : null,
      message: newModal.message.length === 0 ? "please enter message" : null,
    });
    if (validateEmail(newModal.email) && newModal.message.length !== 0) {
      handelSendNewMessage(
        newModal.email,
        newModal.message,
        setNewModal,
        setErrorMsg
      );
    }
  };
  return (
    <Container fluid className="p-0 m-0">
      <Row className={`${classes.newChat}  `}>
        <Col className={`${classes.Col} `} xs="auto">
          <Text
            text={"Conversations"}
            color="#394265"
            size="18px"
            wegiht="600"
          />
        </Col>
        <Col className={`${classes.Col} `} xs="auto">
          <div
            onClick={() => setNewModal({ ...newModal, show: true })}
            className={classes.openNewModal}
          >
            <Text text={"new"} />
          </div>
          {/* Here will be enter the new box */}
        </Col>
      </Row>
      <Row className={`${classes.Conversations} `}>
        {ConversationsData?.map((item, index) => (
          <Row
            key={index}
            className="p-0 m-0"
            onClick={() => handelChooseConversation(item)}
          >
            <Col key={index} className={`${classes.Col} `}>
              <PersonInfo
                key={index}
                {...item}
                active={
                  item.conversationID === activeConversationUsers.conversationID
                }
              />
            </Col>
          </Row>
        ))}
      </Row>
      <ModalRank
        title={"New Message"}
        show={newModal.show}
        onHide={() => {
          setNewModal({
            show: false,
            email: "",
            message: "",
          });
          setErrorMsg({ email: null, message: null });
        }}
        footer={
          <div className={classes.ModalFooter}>
            <ButtonRank
              disabled={loading}
              text={"cancel"}
              onClick={() => {
                setNewModal({
                  show: false,
                  email: "",
                  message: "",
                });
                setErrorMsg({ email: null, message: null });
              }}
            />
            <ButtonRank
              text={"send"}
              onClick={handelValidationSendNewMsg}
              disabled={loading}
            />
          </div>
        }
      >
        {/* <div> */}
        <Text text={"Send a message to:"} wegiht="100" />
        <InputFiledRank
          placeholder={"Enter email address"}
          type={"email"}
          value={newModal.email}
          onChange={(e) => setNewModal({ ...newModal, email: e.target.value })}
          msg={errorMsg.email}
          disabled={loading}
        />
        <br />
        <InputFiledRank
          as={"textarea"}
          rows={"5"}
          value={newModal.message}
          onChange={(e) =>
            setNewModal({ ...newModal, message: e.target.value })
          }
          msg={errorMsg.message}
          disabled={loading}
        />
        {/* </div> */}
      </ModalRank>
    </Container>
  );
};

export default Conversations;
