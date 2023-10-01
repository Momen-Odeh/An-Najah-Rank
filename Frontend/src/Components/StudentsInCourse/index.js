import React, { useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import useStyle from "../TestCases/Style";
import Text from "../Text";
const StudentsInCourse = ({ students, setStudents }) => {
  const classes = useStyle();
  const [showAddModal, setShowAddModal] = useState(false);
  const tableHeader = ["Registration Number", "Name", "email", ""];
  const [student, setStudent] = useState({
    registrationNumber: "",
    studentName: "",
    email: "",
  });
  const handleAdd = () => {
    setStudents([...students, student]);
    setShowAddModal(false);
    setStudent("");
  };
  const handleDelete = (index) => {
    setStudents(students.filter((item, idx) => idx !== index));
  };
  const data = students.map((item, index) => ({
    ...item,
    delete: (
      <BiTrash
        size={30}
        color="#949494"
        className={classes.iconColor}
        onClick={() => handleDelete(index)}
      />
    ),
  }));

  const { registrationNumber, studentName, email } = student;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-end align-items-center">
          <ButtonRank
            text={"Add Student"}
            color="white"
            hoverBackgroundColor="green"
            backgroundColor="#1cb557"
            onClick={() => setShowAddModal(true)}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col></Col>
        <Col md={4} className="d-flex justify-content-end">
          <Form.Control type="text" placeholder="Type username" />
          <ButtonRank
            text={"Search"}
            color="white"
            hoverBackgroundColor="green"
            backgroundColor="#1cb557"
          />
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col>
          <TabTable TableHeader={tableHeader} TableData={data} />
        </Col>
      </Row>
      <Row>
        <Modal
          show={showAddModal}
          dialogClassName={classes.customModal}
          onHide={() => {
            setShowAddModal(false);
            setStudent("");
          }}
          scrollable
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Form>
                <Form.Group controlId="registrationNumber">
                  <Text text={"Registration Number"} />
                  <Form.Control
                    type="text"
                    name="registrationNumber"
                    value={registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                  />
                </Form.Group>

                <Form.Group controlId="studentName" className="mt-2">
                  <Text text={"Student Name"} />
                  <Form.Control
                    type="text"
                    name="studentName"
                    value={studentName}
                    onChange={handleChange}
                    placeholder="Enter student name"
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mt-2">
                  <Text text={"Email"} />
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Container fluid>
              <Row>
                <Col className="d-flex justify-content-end align-align-items-center">
                  <ButtonRank
                    text={"Add"}
                    color="white"
                    hoverBackgroundColor="green"
                    backgroundColor="#1cb557"
                    onClick={handleAdd}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default StudentsInCourse;
