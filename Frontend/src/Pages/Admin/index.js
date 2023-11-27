import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import TabTable from "../../Components/TabTable";
import Text from "../../Components/Text";
import useStyle from "./style";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../Utils/toast";
const Admin = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  useEffect(() => {
    axios
      .get(`/admin`)
      .then((res) => {
        setProfessors(res.data.professors);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //************* guard done ************************ */
          if (error?.response?.data?.message === "Access Denied") {
            toastError("Invalid Access");
            navigate("/");
          } else {
            toastError("Invalid Access");
            navigate("/log-in");
          }
        } else console.log(error);
      });
  }, []);

  const handleAccept = (universityNumber) => {
    axios
      .put(`/admin/${universityNumber}`)
      .then(() => {
        setProfessors(
          professors.filter(
            (item) => item.universityNumber !== universityNumber
          )
        );
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const handleReject = (universityNumber) => {
    axios
      .delete(`/admin/${universityNumber}`)
      .then(() => {
        setProfessors(
          professors.filter(
            (item) => item.universityNumber !== universityNumber
          )
        );
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const header = ["Professor Name", "University Number", "email", ""];
  const data = professors.map((item) => ({
    name: item.name,
    universityNumber: item.universityNumber,
    email: item.email,
    add: (
      <>
        <FaCheck
          size={24}
          className={classes.add}
          onClick={() => handleAccept(item.universityNumber)}
          title="click to accept professor"
        />
        <span className="ms-5"></span>
        <FaTimes
          size={24}
          className={classes.remove}
          onClick={() => handleReject(item.universityNumber)}
          title="click to reject professor"
        />
      </>
    ),
  }));
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Text text={"professors request"} size="30px" />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable TableHeader={header} TableData={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
