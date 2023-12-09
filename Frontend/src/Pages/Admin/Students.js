import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TabTable from "../../Components/TabTable";
import Text from "../../Components/Text";

import InputFiledRank from "../../Components/InputFiledRank";
const Students = ({ activeStudents }) => {
  const [students, setStudents] = useState(activeStudents);
  const [search, setSearch] = useState("");
  const header = ["Student Name", "University Number", "Email"];
  const dataURI = students.map((item) => "/profile/" + item.universityNumber);
  const data = students
    .map((item) => ({
      name: item.name,
      universityNumber: item.universityNumber,
      email: item.email,
    }))
    .filter((word) => word.name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Text text={"Students"} size="30px" />
        </Col>
        <Col className="d-flex justify-content-end">
          <InputFiledRank
            type="text"
            placeholder="Type Student Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width={"250px"}
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable TableHeader={header} TableData={data} url={dataURI} />
        </Col>
      </Row>
    </Container>
  );
};

export default Students;
