import React from "react";
import { Modal } from "react-bootstrap";

const ModalRank = ({ show, onHide, title, children, footer }) => {
  return (
    <Modal show={show} onHide={onHide} scrollable centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default ModalRank;
