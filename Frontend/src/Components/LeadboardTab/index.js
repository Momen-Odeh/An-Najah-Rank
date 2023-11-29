import React from "react";
import TabTable from "../TabTable";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import InputFiledRank from "../InputFiledRank";
import Loader from "../Loader";
const LeadboardTab = () => {
  const classes = useStyles();
  const { id, contestId, challengeId } = useParams();
  const [submissions, setSubmissions] = useState();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    if (currentPath.includes("leaderboard"))
      axios
        .get(
          `/students-leadboard?courseId=${id}&contestId=${contestId}&challengeId=${challengeId}`
        )
        .then((res) => {
          setSubmissions(res.data.submissions);
          setLoadingPage(false);
        })
        .catch((error) => {
          console.log(error);
          setLoadingPage(false);
        });
  }, [location.pathname]);

  const sortedSubmissions = submissions?.slice()?.sort((a, b) => {
    const scoreComparison = b.score - a.score;
    if (scoreComparison === 0) {
      return new Date(a.submissionDate) - new Date(b.submissionDate);
    }
    return scoreComparison;
  });

  const TableHeader = ["Rank", "Student Name", "Score", "Time"];
  const result = sortedSubmissions
    ?.filter((item) =>
      item.studentName?.toLowerCase().includes(search.toLowerCase())
    )
    ?.map((item, index) => ({
      rank: index + 1,
      studentName: item.studentName,
      score: item.score,
      submissionDate: item.submissionDate,
    }));

  return loadingPage ? (
    <Loader internal />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.RowHead} mb-3`}>
        <Col className={classes.ColHead}>
          <InputFiledRank
            type="text"
            placeholder="Type student name"
            className={classes.Form}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TabTable TableData={result} TableHeader={TableHeader} />
        </Col>
      </Row>
    </Container>
  );
};

export default LeadboardTab;
