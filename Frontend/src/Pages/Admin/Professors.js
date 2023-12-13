import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TabTable from "../../Components/TabTable";
import Text from "../../Components/Text";
import InputFiledRank from "../../Components/InputFiledRank";
const Professors = ({ activeProfessors }) => {
  const [professors, setProfessors] = useState(activeProfessors);
  const [search, setSearch] = useState("");
  const dataURI = professors.map((item) => "/profile/" + item.universityNumber);
  const data = professors
    .map((item) => ({
      name: item.name,
      universityNumber: item.universityNumber,
      email: item.email,
    }))
    .filter((word) => word.name?.toLowerCase().includes(search.toLowerCase()));

  const header = ["Professor Name", "University Number", "Email"];
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Text text={"Professors"} size="30px" />
        </Col>
        <Col className="d-flex justify-content-end">
          <InputFiledRank
            type="text"
            placeholder="Type Professor Name"
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

export default Professors;
