import React, { useEffect, useState, memo } from "react";
import TestCase from "../TestCase";
import { Container, Row, Col } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import { HiPencil } from "react-icons/hi";
import { BiCheckCircle, BiTrash } from "react-icons/bi";
import useStyle from "./Style";
import axios from "axios";
import { useParams } from "react-router-dom";
import { validateNumber } from "../../Utils/Validation";
import { toastError } from "../../Utils/toast";
import ModalRank from "../ModalRank";
import Text from "../Text";
import { IoIosCloseCircleOutline } from "react-icons/io";
const TestCases = memo(({ operation, testCasesData, relatedContests }) => {
  const [deleteModal, setDeleteModal] = useState({ show: false });
  const { id } = useParams();
  const classes = useStyle();
  const [showAddModal, setShowAddModal] = useState(false);
  const [action, setAction] = useState("add");
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    input: null,
    output: null,
    explanation: null,
    strength: null,
  });
  const [testCase, setTestCase] = useState({
    id: "",
    order: "",
    input: "",
    output: "",
    sample: false,
    strength: "",
    explanation: null,
    isSelected: false,
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
    // "Select",
    "",
  ];

  const handleAddTestCase = async (selectedContests) => {
    setErrorMsg({
      input:
        testCase.input.length !== 0
          ? null
          : "please enter the input of test cases",
      output:
        testCase.output.length !== 0
          ? null
          : "please enter the output of test cases",
      explanation: null,
      strength:
        testCase.strength.length !== 0 && validateNumber(testCase.strength)
          ? null
          : "Nubmer",
    });
    if (
      testCase.input.length !== 0 &&
      testCase.output.length !== 0 &&
      testCase.strength.length !== 0 &&
      validateNumber(testCase.strength)
    ) {
      setLoading(true);
      const id = await handleAdd(selectedContests);
      if (id) {
        setTestCases([
          ...testCases,
          { ...testCase, order: testCases.length, id: id },
        ]);
      }

      setTestCase("");
      setShowAddModal(false);
      setLoading(false);
    }
  };

  const handleUpdateTestCase = async (selectedContests) => {
    const contestIds = relatedContests
      .map((item, index) => {
        if (selectedContests[index] === true) {
          return item.contestId;
        }
        return null;
      })
      .filter((id) => id !== null);
    console.log("contestIds", contestIds);
    setErrorMsg({
      input:
        testCase.input.length !== 0
          ? null
          : "please enter the input of test cases",
      output:
        testCase.output.length !== 0
          ? null
          : "please enter the output of test cases",
      explanation: null,
      strength:
        testCase.strength.length !== 0 && validateNumber(testCase.strength)
          ? null
          : "Nubmer",
    });
    if (
      testCase.input.length !== 0 &&
      testCase.output.length !== 0 &&
      testCase.strength.length !== 0 &&
      validateNumber(testCase.strength)
    ) {
      setLoading(true);
      const updatedTestCases = [...testCases];
      updatedTestCases[testCase.order] = testCase;
      const index = testCase.order;
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
      try {
        await axios.put(`/test_cases/${updatedTestCases[index].id}`, data);
        if (contestIds.length > 0) {
          axios.post("/run-new-test-case", {
            contestIds: contestIds,
            testCaseId: updatedTestCases[index].id,
            challengeId: id,
            operation: "update",
          });
        }
        setTestCases(updatedTestCases);
      } catch (error) {
        console.log(error);
        toastError("not updated ");
      }
      setTestCase("");
      setShowAddModal(false);
      setLoading(false);
    }
  };

  const removeItem = async (index) => {
    let updatedTestCases = [...testCases];
    try {
      setLoading(true);
      await axios.delete(`/test_cases/${updatedTestCases[index].id}`);
      updatedTestCases.splice(index, 1);
      updatedTestCases = updatedTestCases.map((item, index) => ({
        ...item,
        order: index,
      }));
      setTestCases(updatedTestCases);
      setDeleteModal({ ...deleteModal, show: false });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setDeleteModal({ ...deleteModal, show: false });
      setLoading(false);
    }
  };

  const handleUpdateClick = (index) => {
    setAction("update");
    setTestCase(testCases[index]);
    setShowAddModal(true);
  };

  const handleAdd = async (selectedContests) => {
    const contestIds = relatedContests
      .map((item, index) => {
        if (selectedContests[index] === true) {
          return item.contestId;
        }
        return null;
      })
      .filter((id) => id !== null);
    const dataToAdd = {
      challenge_id: id,
      input_data: testCase.input,
      output_data: testCase.output,
      strength: testCase.strength,
      is_sample: testCase.sample,
      explanation: testCase.sample ? testCase.explanation : null,
    };
    try {
      const res = await axios.post("/test_cases", dataToAdd);
      if (contestIds.length > 0) {
        axios.post("/run-new-test-case", {
          contestIds: contestIds,
          testCaseId: res,
          challengeId: id,
          operation: "create",
        });
      }
      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  const data = testCases.map((item, i) => ({
    Order: item.order,
    Input: typeof item.input === "string" ? item.input : "input" + i + "file",
    Output:
      typeof item.output === "string" ? item.output : "output" + i + "file",
    Sample: (
      <div>
        {item.sample ? (
          <BiCheckCircle size={24} color="green" />
        ) : (
          <IoIosCloseCircleOutline size={24} color="red" />
        )}
      </div>
    ),
    Strength: item.strength,
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
          onClick={() => setDeleteModal({ show: true, index: i })}
        />
      </>
    ),
  }));

  return (
    <Container fluid>
      <TestCase
        setShowAddModal={setShowAddModal}
        handleUpdate={handleUpdateTestCase}
        handleAdd={handleAddTestCase}
        showAddModal={showAddModal}
        currentTestCase={testCase}
        setCurrentTestCase={setTestCase}
        action={action}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        loading={loading}
        relatedContests={relatedContests}
      />
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
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
          />
        </Col>
      </Row>
      <Row>
        <span className="mb-1" style={{ color: "red", fontWeight: "bold" }}>
          * Should add at least one sample test case to enable use this
          challenge.
        </span>
        <TabTable TableHeader={header} TableData={data} />
      </Row>
      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title="Delete Test case"
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={() => removeItem(deleteModal.index)}
            disabled={loading}
          />
        }
      >
        <Text
          text={
            "are you sure that want to delete the test case with order " +
            deleteModal.index +
            " from the test cases?"
          }
          size="0.9em"
          fontFamily="Open Sans"
          wegiht="600"
          color="#0e141e"
        />
      </ModalRank>
    </Container>
  );
});
export default TestCases;
