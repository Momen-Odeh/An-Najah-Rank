import React, { useEffect, useState, memo } from "react";
import TestCase from "../TestCase";
import { Container, Row, Col } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { HiPencil } from "react-icons/hi";
import { BiCheckbox, BiCheckCircle, BiTrash } from "react-icons/bi";
import useStyle from "./Style";
import Axios from "axios";
import AlertComponent from "../Alert";
import { useParams } from "react-router-dom";

const TestCases = memo(({ operation, testCasesData }) => {
  const { id } = useParams();
  const classes = useStyle();
  const [showAddModal, setShowAddModal] = useState(false);
  const [action, setAction] = useState("add");
  const [testCases, setTestCases] = useState([]);
  const [testCase, setTestCase] = useState({
    id: "",
    order: "",
    input: "",
    output: "",
    sample: false,
    strength: 10,
    explanation: null,
    isSelected: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
  useEffect(() => {
    if (testCasesData) setTestCases(testCasesData);
  }, [testCasesData]);
  const header = [
    "Order",
    "Input",
    "Output",
    "Sample",
    "Strength",
    "Select",
    "",
  ];

  const handleAddTestCase = async () => {
    const id = await handleAdd(testCases.length);
    if (id) {
      setTestCases([
        ...testCases,
        { ...testCase, order: testCases.length, id: id },
      ]);
    }
    setTestCase("");
    setShowAddModal(false);
  };

  const handleUpdateTestCase = async (index, name, newData) => {
    const updatedTestCases = [...testCases];
    if (name === "all") {
      updatedTestCases[testCase.order] = testCase;
      index = testCase.order;
    } else
      updatedTestCases[index] = { ...updatedTestCases[index], [name]: newData };
    if (name === "sample")
      updatedTestCases[index] = {
        ...updatedTestCases[index],
        strength: updatedTestCases[index].sample ? 0 : 10,
      };
    if (name !== "isSelected") {
      const data = {
        challenge_id: id,
        input_data: updatedTestCases[index].input,
        output_data: updatedTestCases[index].output,
        strength: updatedTestCases[index].strength,
        is_sample: updatedTestCases[index].sample,
        explanation: updatedTestCases[index].sample
          ? updatedTestCases[index].explanation
          : null,
      };
      await Axios.put(
        `http://localhost:5000/test_cases/${updatedTestCases[index].id}`,
        data
      );
    }
    setTestCases(updatedTestCases);
    setTestCase("");
    setShowAddModal(false);
  };

  const removeItem = async (index) => {
    let updatedTestCases = [...testCases];
    await Axios.delete(
      `http://localhost:5000/test_cases/${updatedTestCases[index].id}`
    );
    updatedTestCases.splice(index, 1);
    updatedTestCases = updatedTestCases.map((item, index) => ({
      ...item,
      order: index,
    }));
    setTestCases(updatedTestCases);
  };

  const handleUpdateClick = (index) => {
    setAction("update");
    setTestCase(testCases[index]);
    setShowAddModal(true);
  };

  const handleAdd = async () => {
    const dataToAdd = {
      challenge_id: id,
      input_data: testCase.input,
      output_data: testCase.output,
      strength: testCase.strength,
      is_sample: testCase.sample,
      explanation: testCase.sample ? testCase.explanation : null,
    };
    setShowAlert(false);
    try {
      const response = await Axios.post(
        "http://localhost:5000/test_cases",
        dataToAdd
      );
      const params = new URLSearchParams(dataToAdd);
      const res = await Axios.get(
        "http://localhost:5000/test_cases?" + params.toString()
      );
      console.log(res.data.message);
      return res.data.message;
    } catch (error) {
      setAlertData({ message: error.response.data.message, variant: "danger" });
      setShowAlert(true);
    }
  };

  const data = testCases.map((item, i) => ({
    Order: item.order,
    Input: typeof item.input === "string" ? item.input : "input" + i + "file",
    Output:
      typeof item.output === "string" ? item.output : "output" + i + "file",
    Sample: (
      <div onClick={() => handleUpdateTestCase(i, "sample", !item.sample)}>
        {item.sample ? (
          <BiCheckCircle size={24} color="green" />
        ) : (
          <BiCheckbox size={24} color="#949494" />
        )}
      </div>
    ),
    Strength: item.strength,
    Select: (
      <div
        onClick={() => handleUpdateTestCase(i, "isSelected", !item.isSelected)}
      >
        {item.isSelected ? (
          <BiCheckCircle size={24} color="green" />
        ) : (
          <BiCheckbox size={24} color="#949494" />
        )}
      </div>
    ),
    update: (
      <>
        <HiPencil
          size={30}
          color="#949494"
          className={classes.iconColor}
          onClick={() => handleUpdateClick(i)}
        />
        <BiTrash
          size={30}
          color="#949494"
          className={classes.iconColor}
          onClick={() => removeItem(i)}
        />
      </>
    ),
  }));

  /**********************************************************calculate percent ************************************/
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const selectedTestCases = testCases.filter(
      (testCase) => testCase.isSelected
    );
    const sumSelectedStrength = selectedTestCases.reduce(
      (sum, testCase) => sum + parseInt(testCase.strength, 10),
      0
    );
    const sumTotalStrength = testCases.reduce(
      (sum, testCase) => sum + parseInt(testCase.strength, 10),
      0
    );
    const calculatedPercentage =
      sumTotalStrength === 0
        ? 0
        : (sumSelectedStrength / sumTotalStrength) * 100;
    setPercentage(calculatedPercentage);
  }, [testCases, testCase.isSelected]);

  console.log(testCases);
  /**********************************************************************************************************/
  return (
    <Container fluid className="p-0">
      <TestCase
        setShowAddModal={setShowAddModal}
        handleUpdate={handleUpdateTestCase}
        handleAdd={handleAddTestCase}
        showAddModal={showAddModal}
        currentTestCase={testCase}
        setCurrentTestCase={setTestCase}
        action={action}
      />
      <Row className="mb-3">
        <Col className="d-flex justify-content-end m-0 p-0">
          <ButtonRank
            text={"Add Test Case"}
            onClick={() => {
              setTestCase({
                order: "",
                input: "",
                output: "",
                sample: false,
                strength: 10,
                explanation: "",
                isSelected: false,
              });
              setAction("add");
              setShowAddModal(true);
            }}
            backgroundColor="#1cb557"
            hoverBackgroundColor="green"
            color="white"
          />
        </Col>
      </Row>
      <Row>
        <TabTable TableHeader={header} TableData={data} />
      </Row>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          {showAlert && (
            <AlertComponent
              message={alertData.message}
              variant={alertData.variant}
            />
          )}
        </Col>
      </Row>
      <Row>
        <p style={{ fontSize: "18px", marginTop: "24px" }}>
          You will get{" "}
          <span style={{ backgroundColor: "yellow" }}>
            {percentage.toFixed(2)}%
          </span>{" "}
          of the maximum score if you pass the selected test cases.
        </p>
      </Row>
    </Container>
  );
});
export default TestCases;
