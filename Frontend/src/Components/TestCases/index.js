import React, { useState } from "react";
import TestCase from "../TestCase";
import { Container, Row, Col, Form } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { HiPencil } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
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
    strength: "",
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

  let data = [];
  for (let i = 0; i < testCases.length; i++) {
    data[i] = {
      Order: "",
      Input: "",
      Output: "",
      Sample: "",
      Strength: "",
      Select: "",
      update: (
        <>
          <HiPencil size={30} color="#949494" className={classes.iconColor} onClick={()=>handleUpdateClick(i)}/>
          <BiTrash size={30} color="#949494" className={classes.iconColor} onClick={()=>removeItem(i)}/>
        </>
      ),
    };
    data[i].Order = testCases[i].order;
    data[i].Input = typeof testCases[i].input ==='string'?testCases[i].input:'input'+i+'file'
    data[i].Output = typeof testCases[i].output ==='string'?testCases[i].input:'output'+i+'file'
    data[i].Sample = (
      <Form.Group>
        <Form.Check
          type="checkbox"
          name="sample"
          checked={testCases[i].sample}
          onChange={(e) => handleUpdateTestCase(i, "sample", e.target.checked)}
        />
      </Form.Group>
    );
    data[i].Strength = testCases[i].strength;
    data[i].Select = (
      <Form.Group>
        <Form.Check type="checkbox" name="isSelected"
        checked={testCases[i].isSelected}
        onChange={(e) => handleUpdateTestCase(i, "isSelected", e.target.checked)}
        />
      </Form.Group>
    );
  }

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
                setAction("add")
                setTestCase('')
                setShowAddModal(true)
            }}
            backgroundColor="#1cb557"
            hoverBackgroundColor="green"
            color="white"
          />
        </Col>
      </Row>
      <Row>
        <TabTable TableHeader={header} submitions={data} />
      </Row>
      {/* <Row>
        <p style={{fontSize:'18px', marginTop:'24px'}}>You will get <span style={{backgroundColor:'yellow'}}>{'0.00%'}</span> of the maximum score if you pass the selected test cases.</p>
      </Row> */}
    </Container>
  );
};

export default TestCases;
