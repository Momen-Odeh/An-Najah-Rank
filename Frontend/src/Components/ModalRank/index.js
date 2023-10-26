import React from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Text from "../Text";
import ButtonRank from "../ButtonRank";

const ModalRank = ({ show, onHide, title, children, footer }) => {
  return (
    <Modal
      show={show}
      //   dialogClassName={classes.customModal}
      onHide={onHide}
      scrollable
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default ModalRank;
