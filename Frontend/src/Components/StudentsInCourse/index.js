import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import useStyle from "../TestCases/Style";
import Text from "../Text";
const StudentsInCourse = ({ students, setStudents }) => {
  const classes = useStyle();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const tableHeader = ["Registration Number", "Name", "email", ""];
  const [student, setStudent] = useState({
    registrationNumber: "",
    studentName: "",
    email: "",
  });
  const handleAdd = async () => {
    if (student.registrationNumber) {
      const result = await axios.post(
        `http://localhost:5000/student_enrollments`,
        {
          studentNumber: student.registrationNumber,
          courseNumber: id,
        }
      );
      setStudents([
        ...students,
        {
          registrationNumber: result.data.registrationNumber,
          studentName: result.data.studentName,
          email: result.data.email,
        },
      ]);
      setShowAddModal(false);
      setStudent("");
    }
  };
  const handleDelete = async (index) => {
    await axios.delete(
      `http://localhost:5000/student_enrollments?courseNumber=${id}&studentNumber=${students[index].registrationNumber}`
    );
    setStudents(students.filter((item, idx) => idx !== index));
  };
  const data = students
    .filter((word) =>
      word.studentName?.toLowerCase().includes(search.toLowerCase())
    )
    .map((item, index) => ({
      registrationNumber: item.registrationNumber,
      studentName: item.studentName,
      email: item.email,
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
          <Form.Control
            type="text"
            placeholder="Type username to search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
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
                    type="number"
                    name="registrationNumber"
                    value={registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                    className="mt-2"
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
