import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { FaCheck, FaTimes } from "react-icons/fa";
import TabTable from "../../Components/TabTable";
import Text from "../../Components/Text";
import useStyle from "./style";
const Admin = () => {
  const classes = useStyle();
  const [professors, setProfessors] = useState([]);
  const [cookies, setCookies] = useCookies();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin?token=${cookies.token}`)
      .then((res) => {
        setProfessors(res.data.professors);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const handleAccept = (universityNumber) => {
    axios
      .put(`http://localhost:5000/admin/${universityNumber}`, {
        token: cookies.token,
      })
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
      .delete(
        `http://localhost:5000/admin/${universityNumber}?token=${cookies.token}`
      )
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
