import React, { useState } from "react";
import TabTable from "../TabTable";
import ButtonRank from "../ButtonRank";
import SubmitionTab from "../../Components/SubmitionTab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import InputFiledRank from "../InputFiledRank";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import useStyle from "./style";
import Loader from "../Loader";
const SubmissionProfessor = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const { id, contestId, challengeId } = useParams();
  const [maxScore, setMaxScore] = useState();
  const [studentsSubmission, setStudentsSubmission] = useState([]);
  const [showItem, setShowItem] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ sortOn: null, type: null });
  const location = useLocation();
  const currentPath = location.pathname;
  const [loadingPage, setLoadingPage] = useState(true);
  const [similarityState, setSimilarityState] = useState();
  useEffect(() => {
    if (currentPath.includes("submissions"))
      axios
        .get(
          `/submissions-students?courseId=${id}&contestId=${contestId}&challengeId=${challengeId}`
        )
        .then((res) => {
          console.log(res.data);
          setStudentsSubmission(res.data.submissions);
          setSimilarityState(res.data.similarityState);
          setMaxScore(res.data.maxScore);
          setShowItem(1);
          setLoadingPage(false);
        })
        .catch((error) => {
          if (error?.response?.status == 401) setShowItem(0);
          else toastError(error);
          setLoadingPage(false);
        });
  }, [location.pathname]);

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
        <div
          className="me-3 d-flex flex-column justify-content-center align-items-center"
          key={index}
        >
          <span>{item.score}</span>
          <hr className={classes.line}></hr>
          <span>{maxScore}</span>
        </div>
      ),
      similarity: (
        <span
          className="d-flex justify-content-center align-items-center me-4"
          key={index}
        >
          {similarityState === null
            ? "---"
            : similarityState === "in progress"
            ? "..."
            : item.similarity !== null
            ? item.similarity + "%"
            : "No calculated"}

          {/* //******************************************************************************************************  */}
        </span>
      ),
      studentSubmissions: (
        <ButtonRank
          key={index}
          text={"View Submissions"}
          size="small"
          onClick={() =>
            navigate(
              `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/manual-mark/${item.studentUniversityNumber}`
            )
          }
        />
      ),
      studentSimilarity: similarityState !== null &&
        similarityState !== "in progress" && (
          <ButtonRank
            key={index}
            text={"View Similarity"}
            size="small"
            // disabled={similarityState === null}
            onClick={() =>
              navigate(
                `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/code-similarity/${item.studentUniversityNumber}`
              )
            }
          />
        ),
    }));

  const handleCalculateSimilarity = () => {
    setSimilarityState("in progress");
    axios.post(`/file-Similarity`, {
      contestId: contestId,
      challengeId: challengeId,
      courseId: id,
    });
  };

  return loadingPage ? (
    <Loader internal />
  ) : showItem == null ? (
    <></>
  ) : showItem === 1 ? (
    <Container fluid className="p-0 m-0">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <InputFiledRank
            type="text"
            placeholder="Type student name"
            onChange={(e) => setSearch(e.target.value)}
          />

          <ButtonRank
            text={
              similarityState === "in progress" ? (
                <span>
                  Calculate Similarity
                  <Spinner animation="border" size="sm" className="ms-2" />
                </span>
              ) : (
                "Calculate Similarity"
              )
            }
            disabled={similarityState === "in progress"}
            onClick={handleCalculateSimilarity}
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
