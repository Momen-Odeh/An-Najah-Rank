import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../../Components/Text";
import PersonInfo from "./PersonInfo";
import ModalRank from "../../Components/ModalRank";
import { useState } from "react";
import InputFiledRank from "../../Components/InputFiledRank";
import ButtonRank from "../../Components/ButtonRank";

const Conversations = ({ ConversationsData }) => {
  const classes = useStyle();
  const [newModal, setNewModal] = useState({ show: false });

  return (
    <Container fluid>
      <Row className={`${classes.newChat}`}>
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
      <Row className={`${classes.Conversations}`}>
        {ConversationsData?.map((item, index) => (
          <Row key={index}>
            <Col key={index} className={`${classes.Col} `}>
              <PersonInfo key={index} {...item} />
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
            <ButtonRank text={"send"} />
          </>
        }
      >
        {/* <div> */}
        <Text text={"Send a message to:"} wegiht="100" />
        <InputFiledRank placeholder={"Enter email address"} />
        <br />
        <InputFiledRank as={"textarea"} rows={"5"} />
        {/* </div> */}
      </ModalRank>
    </Container>
  );
};

export default Conversations;
