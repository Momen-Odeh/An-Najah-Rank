import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { FaCheck, FaTimes } from "react-icons/fa";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
const SubmitionTab = () => {
  const classes = useStyles();
  const { id, challengeId, contestId } = useParams();
  const navigate = useNavigate();
  const TableHeader = ["Problem", "Language", "Time", "Result", "Score", ""];
  const [submissionsData, setSubmissionsData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    axios
      .get(
        `/student_submissions?challengeId=${challengeId}&courseNumber=${id}&contestId=${contestId}`
      )
      .then((res) => {
        setSubmissionsData(res.data.submissions);
        setLoadingPage(false);
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response.status === 401) {
          navigate("/log-in");
        } else setLoadingPage(false);
      });
  }, []);
  const submissions = submissionsData?.map((item) => ({
    Problem: item.challengeName,
    Language: item.language,
    Time: item.submissionTime,
    Result: (
      <span>
        {item.result}
        {item.result === "Accepted" ? (
          <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
        ) : (
          <FaTimes color="red" size={20} className="me-3" />
        )}
      </span>
    ),
    Score: item.score,
    action: (
      <ButtonRank
        text={"View Result"}
        onClick={() =>
          navigate(
            `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/${item.submissionId}`
          )
        }
      />
    ),
  }));

  return loadingPage ? (
    <Loader internal />
  ) : (
    <TabTable TableData={submissions} TableHeader={TableHeader} />
  );
};

export default SubmitionTab;
