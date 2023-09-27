import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import { FaCheck } from "react-icons/fa";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
const SubmitionTab = () => {
  const classes = useStyles();
  const TableHeader = ["Problem", "Language", "Time", "Result", "Score", ""];
  const submitions = [
    {
      Problem: "DAQ-Spring-2021-Q2",
      Language: "Java",
      Time: "a year ago",
      Result: (
        <span>
          Accepted <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
        </span>
      ),
      Score: "30",
      action: <ButtonRank text={"Veiw Result"} />,
    },
    {
      Problem: "DAQ-Spring-2023-Q1",
      Language: "C++",
      Time: "a month ago",
      Result: (
        <span>
          Accepted <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
        </span>
      ),
      Score: "30",
      action: <ButtonRank text={"Veiw Result"} />,
    },
    {
      Problem: "DAQ-Spring-2023-Q2",
      Language: "Python",
      Time: "a day ago",
      Result: (
        <span>
          Accepted <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
        </span>
      ),
      Score: "30",
      action: <ButtonRank text={"Veiw Result"} />,
    },
  ];

  return <TabTable submitions={submitions} TableHeader={TableHeader} />;
};

export default SubmitionTab;
