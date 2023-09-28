import React, { useEffect, useState } from "react";
import TestCase from "../TestCase";
import { Container, Row, Col } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { HiPencil } from "react-icons/hi";
import { BiCheckbox, BiCheckCircle, BiTrash } from "react-icons/bi";
import useStyle from "./Style";

const TestCases = () => {
  const classes = useStyle();
  const [showAddModal, setShowAddModal] = useState(false);
  const [action, setAction] = useState("add");
  const [testCases, setTestCases] = useState([]);
  const [testCase, setTestCase] = useState({
    order: "",
    input: "",
    output: "",
    sample: false,
    strength: 10,
    explanation: "",
    isSelected: false
  });
  const header = [
    "Order",
    "Input",
    "Output",
    "Sample",
    "Strength",
    "Select",
    "",
  ];
  const handleAddTestCase = () => {
    setTestCases([...testCases, { ...testCase, order: testCases.length }]);
    setTestCase("");
    setShowAddModal(false);
  };
  console.log(testCases);

  const handleUpdateTestCase = (index, name, newData) => {
    const updatedTestCases = [...testCases];
    if (name === "all") updatedTestCases[testCase.order] = testCase;
    else
      updatedTestCases[index] = { ...updatedTestCases[index], [name]: newData };
    if(name==='sample') updatedTestCases[index] = { ...updatedTestCases[index], 'strength':updatedTestCases[index].sample?0:10  };
    setTestCases(updatedTestCases);
    setTestCase('')
    setShowAddModal(false);
  };

  const removeItem = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  const handleUpdateClick=(index)=>{
    setAction("update")
    setTestCase(testCases[index])
    setShowAddModal(true);
  }

  const data = testCases.map((item, i) => ({
    Order: item.order,
    Input: typeof item.input === 'string' ? item.input : 'input' + i + 'file',
    Output: typeof item.output === 'string' ? item.output : 'output' + i + 'file',
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
      <div onClick={() => handleUpdateTestCase(i, "isSelected", !item.isSelected)}>
        {item.isSelected ? (
          <BiCheckCircle size={24} color="green" />
        ) : (
          <BiCheckbox size={24} color="#949494" />
        )}
      </div>
    ),
    update: (
      <>
        <HiPencil size={30} color="#949494" className={classes.iconColor} onClick={() => handleUpdateClick(i)} />
        <BiTrash size={30} color="#949494" className={classes.iconColor} onClick={() => removeItem(i)} />
      </>
    ),
  }));
  

/**********************************************************calculate percent ************************************/
const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const selectedTestCases = testCases.filter((testCase) => testCase.isSelected);
    const sumSelectedStrength = selectedTestCases.reduce(
      (sum, testCase) => sum + parseInt(testCase.strength, 10),
      0
    );
    const sumTotalStrength = testCases.reduce(
      (sum, testCase) => sum + parseInt(testCase.strength, 10),
      0
    );
    const calculatedPercentage =
      sumTotalStrength === 0 ? 0 : (sumSelectedStrength / sumTotalStrength) * 100;
    setPercentage(calculatedPercentage);
  }, [testCases, testCase.isSelected]);
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
                isSelected: false
              })
                setAction("add")
                setShowAddModal(true)
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
};

export default TestCases;
