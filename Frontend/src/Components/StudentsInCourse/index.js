import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import useStyle from "../TestCases/Style";
import Text from "../Text";
import InputFiledRank from "../InputFiledRank";
import useStyles from "./style";
import ModalRank from "../ModalRank";
import { validateUniversityNumber } from "../../Utils/Validation";
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
  const [errorMsg, setErrorMsg] = useState({ registrationNumber: null });
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, index: -1 });
  const handleAdd = async () => {
    // console.log(student.registrationNumber);
    setErrorMsg({
      registrationNumber: !validateUniversityNumber(student.registrationNumber)
        ? "must be Number at consist from 3 character at least"
        : null,
    });
    if (validateUniversityNumber(student.registrationNumber)) {
      try {
        setLoading(true);
        const result = await axios.post(`/student_enrollments`, {
          studentNumber: student.registrationNumber,
          courseNumber: id,
        });
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
      } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
          setErrorMsg({
            ...errorMsg,
            registrationNumber: "User already exist",
          });
        }
      }
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    const { index } = deleteModal;
    setLoading(true);
    await axios.delete(`/student_enrollments`, {
      params: {
        courseNumber: id,
        studentNumber: students[index].registrationNumber,
      },
    });
    setStudents(students.filter((item, idx) => idx !== index));
    setDeleteModal({ show: false });
    setLoading(false);
  };
  let dataURI = [];
  const data = students
    .filter((word) =>
      word.studentName?.toLowerCase().includes(search.toLowerCase())
    )
    .map((item, index) => {
      dataURI.push(`/profile/${item.registrationNumber}`);
      return {
        registrationNumber: item.registrationNumber,
        studentName: item.studentName,
        email: item.email,

        delete: (
          <BiTrash
            size={30}
            color="#949494"
            className={classes.iconColor}
            onClick={() =>
              setDeleteModal({
                show: true,
                index: index,
                registrationNumber: item.registrationNumber,
              })
            }
          />
        ),
      };
    });
  console.log(dataURI);
  const { registrationNumber, studentName, email } = student;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };
  const clasess = useStyles();
  return (
    <Container>
      <Row className={clasess.Row}>
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
        <Col xs={"auto"} className={clasess.AddCol}>
          <ButtonRank
            text={"Add Student"}
            hoverBackgroundColor="#0e141e"
            onClick={() => setShowAddModal(true)}
          />
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col>
          <TabTable TableHeader={tableHeader} TableData={data} url={dataURI} />
        </Col>
      </Row>
      <ModalRank
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          setStudent("");
        }}
        title="Add student"
        footer={
          <ButtonRank
            text={"Add student"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
            disabled={loading}
            onClick={handleAdd}
          />
        }
      >
        <InputFiledRank
          id="UniNum"
          label={"Registration Number"}
          name={"registrationNumber"}
          value={registrationNumber}
          type={"text"}
          placeholder={"Enter registration number"}
          onChange={handleChange}
          msg={errorMsg.registrationNumber}
          disabled={loading}
        />
      </ModalRank>

      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title="Delete Student"
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={handleDelete}
            disabled={loading}
          />
        }
      >
        <Text
          text={
            "are you sure that want to delete the student with id " +
            deleteModal.registrationNumber +
            " from the course?"
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

export default StudentsInCourse;
