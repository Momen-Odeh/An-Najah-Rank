import React, { useState } from "react";
import ChallengeTabs from "../ChallengTabs";
import TabTable from "../TabTable";
import { Col, Container, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import SubmissionTab from "./SubmissionTab";
const SubmissionsProfessor = () => {
  const [testCases, setTestCases] = useState([
    {
      input: "",
      output: "",
      strength: 10,
      isSample: false,
    },
  ]);
  const [studentsSubmission, setStudentsSubmission] = useState([
    //all students submission ---------------------------------------- last submission
    {
      id: 7,
      score: 40,
      studentName: "Noor Aldeen",
      submissionDate: "2023-11-17 15:06:58",
    },
  ]);
  const tableHeader = ["Name", "Date", "Score", ""];
  const tableData = studentsSubmission?.map((item, index) => ({
    score: item.score,
    StudentName: item.studentName,
    SubmissionDate: item.submissionDate,
    studentSubmissions: <ButtonRank text={"View Submissions"} />,
  }));
  const [studentSubmissions, setStudentSubmissions] = useState([
    //-------------------------------------------all submissions for a student------------
    {
      id: 7,
      score: 40,
      submissionStatus: true,
      code: "int x;",
      language: "java",
      submissionDate: "2023-11-17 15:06:58",
      testCaseOutput: [],
    },
  ]);
  const listTabs = studentSubmissions.map((item, index) => ({
    eventKey: "Submission " + index,
    title: "Submission " + index,
    TabComponent: <SubmissionTab submissionData={item} />,
  }));
  return (
    <Container>
      <Row>
        <Col>
          {/* <TabTable TableHeader={tableHeader} TableData={tableData} /> */}
          <ChallengeTabs ListTabs={listTabs} />
        </Col>
      </Row>
    </Container>
  );
};

export default SubmissionsProfessor;
