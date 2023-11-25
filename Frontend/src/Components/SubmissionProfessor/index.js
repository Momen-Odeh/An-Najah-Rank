import React, { useState } from "react";
import TabTable from "../TabTable";
import ButtonRank from "../ButtonRank";
const SubmissionProfessor = () => {
  const [maxScore, setMaxScore] = useState(50);
  const [studentsSubmission, setStudentsSubmission] = useState([
    {
      studentUniversityNumber: 11923929,
      score: 40,
      studentName: "Noor Aldeen",
      similarity: 20,
      submissionDate: "2023-11-17 15:06:58",
    },
  ]);
  const tableHeader = ["Name", "Date", "Score", ""];
  const tableData = studentsSubmission?.map((item, index) => ({
    score: item.score + "/" + maxScore,
    StudentName: item.studentName,
    SubmissionDate: item.submissionDate,
    similarity: item.similarity + "%",
    studentSubmissions: <ButtonRank text={"View Submissions"} />,
  }));

  return <TabTable TableHeader={tableHeader} TableData={tableData} />;
};

export default SubmissionProfessor;
