import React, { useState } from "react";
import TabTable from "../TabTable";
import ButtonRank from "../ButtonRank";
import SubmitionTab from "../../Components/SubmitionTab";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import InputFiledRank from "../InputFiledRank";
import { Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
const SubmissionProfessor = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const { id, contestId, challengeId } = useParams();
  const [maxScore, setMaxScore] = useState(50);
  const [studentsSubmission, setStudentsSubmission] = useState([]);
  const [showItem, setShowItem] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ sortOn: null, type: null });
  useEffect(() => {
    axios
      .get(
        `/submissions-students?courseId=${id}&contestId=${contestId}&challengeId=${challengeId}`
      )
      .then((res) => {
        setStudentsSubmission(res.data.submissions);
        setMaxScore(res.data.maxScore);
        setShowItem(1);
      })
      .catch((error) => {
        if (error?.response?.status == 401) setShowItem(0);
        else toastError(error);
      });
  }, []);

  const tableHeader = [
    "Name",
    "Date",
    <div>
      Score
      <span
        className={classes.span}
        onClick={() => setSort({ sortOn: "score", type: "desc" })}
      >
        ▼
      </span>
      <span
        className={classes.span}
        onClick={() => setSort({ sortOn: "score", type: "asc" })}
      >
        ▲
      </span>
    </div>,
    <div>
      Similarity
      <span
        className={classes.span}
        onClick={() => setSort({ sortOn: "similarity", type: "desc" })}
      >
        ▼
      </span>
      <span
        className={classes.span}
        onClick={() => setSort({ sortOn: "similarity", type: "asc" })}
      >
        ▲
      </span>
    </div>,
    "",
  ];
  const tableData = studentsSubmission
    ?.sort((a, b) => {
      if (sort.sortOn && sort.type) {
        const aValue = a[sort.sortOn];
        const bValue = b[sort.sortOn];

        if (sort.type === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else if (sort.type === "desc") {
          return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
        }
      }
      return 0;
    })
    ?.filter((item) =>
      item.studentName?.toLowerCase().includes(search.toLowerCase())
    )
    ?.map((item, index) => ({
      StudentName: item.studentName,
      SubmissionDate: item.submissionDate,
      score: (
        <div className="me-3 d-flex flex-column justify-content-center align-items-center">
          <span>{item.score}</span>
          <hr className={classes.line}></hr>
          <span>{maxScore}</span>
        </div>
      ),
      similarity: item.similarity + "%",
      studentSubmissions: (
        <ButtonRank
          text={"View Submissions"}
          size="small"
          onClick={() =>
            navigate(
              `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/manual-mark/${item.studentUniversityNumber}`
            )
          }
        />
      ),
      studentSimilarity: (
        <ButtonRank
          text={"View Similarity"}
          size="small"
          onClick={() =>
            navigate(
              `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/code-similarity/${item.studentUniversityNumber}`
            )
          }
        />
      ),
    }));

  return showItem == null ? (
    <></>
  ) : showItem === 1 ? (
    <Container fluid className="p-0 m-0">
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <InputFiledRank
            type="text"
            placeholder="Type student name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <TabTable TableHeader={tableHeader} TableData={tableData} />
    </Container>
  ) : (
    <SubmitionTab />
  );
};

export default SubmissionProfessor;
