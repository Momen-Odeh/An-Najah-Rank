import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../../Components/Text";
import PersonInfo from "./PersonInfo";
import ModalRank from "../../Components/ModalRank";
import { useState } from "react";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";

const Conversations = ({
  ConversationsData,
  handelSendNewMessage,
  handelChooseConversation,
  activeConversationUsers,
}) => {
  const classes = useStyle();
  const [newModal, setNewModal] = useState({
    show: false,
    email: "",
    message: "",
  });

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
        onHide={() => setNewModal({ ...newModal, show: false })}
        footer={
          <>
            <ButtonRank
              text={"cancel"}
              onClick={() => setNewModal({ ...newModal, show: false })}
            />
            <ButtonRank
              text={"send"}
              onClick={() => {
                handelSendNewMessage(newModal.email, newModal.message);
                setNewModal({ show: false });
              }}
            />
          </>
        }
      >
        {/* <div> */}
        <Text text={"Send a message to:"} wegiht="100" />
        <InputFiledRank
          placeholder={"Enter email address"}
          value={newModal.email}
          onChange={(e) => setNewModal({ ...newModal, email: e.target.value })}
        />
        <br />
        <InputFiledRank
          as={"textarea"}
          rows={"5"}
          value={newModal.message}
          onChange={(e) =>
            setNewModal({ ...newModal, message: e.target.value })
          }
        />
        {/* </div> */}
      </ModalRank>
    </Container>
  );
};

export default Conversations;
