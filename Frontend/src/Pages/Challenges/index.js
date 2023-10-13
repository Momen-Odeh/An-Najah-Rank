import React, { useEffect, useState } from "react";
import Details from "../../Components/Details";
import ChallengeTabs from "../../Components/ChallengTabs";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Text from "../../Components/Text";
import { Container, Row } from "react-bootstrap";
import TestCases from "../../Components/TestCases";
import { useParams } from "react-router-dom";
import Axios from "axios";
const Challenges = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({
    difficulty: "Easy",
    name: null,
    description: null,
    problemStatement: null,
    inputFormat: null,
    constraints: null,
    outputFormat: null,
    tags: [],
  });
  const [testCasesData, setTestCasesData] = useState([]);
  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/challenge/" + id)
      .then((res) => {
        console.log(res);
        setDetails({
          difficulty: res.data.difficulty,
          name: res.data.name,
          description: res.data.description,
          problemStatement: res.data.problem_statement,
          inputFormat: res.data.inputFormat,
          constraints: res.data.constraints,
          outputFormat: res.data.outputFormat,
          tags: res.data.tags,
        });
        setTestCasesData(
          res.data.testCases.map((item, index) => ({
            id: item.id,
            order: index,
            input: item.input_data,
            output: item.output_data,
            sample: item.is_sample,
            strength: item.strength,
            explanation: item.explanation,
            isSelected: false,
          }))
        );
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const tabs = [
    {
      title: "Details",
      eventKey: "Details",
      TabComponent: <Details operation={"update"} data={details} />,
      urlPattern: `/challenges/${id}/details`,
    },
    {
      title: "TestCases",
      eventKey: "TestCases",
      TabComponent: (
        <TestCases operation={"update"} testCasesData={testCasesData} />
      ),
      urlPattern: `/challenges/${id}/test-cases`,
    },
  ];
  const path = [
    { title: "Manage Challenges", url: "#manage challenges" },
    { title: details.name, url: "#" },
  ];
  return (
    <>
      <Container>
        <Row className="m-2">
          <Breadcrumbs path={path} />
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row className="m-2 mt-4 mb-2">
          <Text
            text={details.name}
            size={"30px"}
            fontFamily={"OpenSans"}
            color={"#39424e"}
          />
        </Row>
        <Row className="m-2">
          <ChallengeTabs ListTabs={tabs} />
        </Row>
      </Container>
    </>
  );
};

export default Challenges;
