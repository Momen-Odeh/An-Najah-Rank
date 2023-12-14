import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import SelectionGroup from "../SelectionGroup";
import Switch from "react-switch";
import ButtonRank from "../ButtonRank";
import ChallengeContext from "../../Utils/ChallengeContext";
import axios from "axios";
import TestCaseProblem from "../TestCaseProblem";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import BackEndURI from "../../Utils/BackEndURI";
import { useNavigate, useParams } from "react-router-dom";
import { toastError } from "../../Utils/toast";

const defaultLang = {
  java: `  import java.io.*;
  import java.util.*;
  
  class Main {
  
      public static void main(String[] args) {
          /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
      }
  }`,
  c: `  #include <stdio.h>
  #include <string.h>
  #include <math.h>
  #include <stdlib.h>
  
  int main() {
  
      /* Enter your code here. Read input from STDIN. Print output to STDOUT */    
      return 0;
  }`,
  cpp: `  #include <cmath>
  #include <cstdio>
  #include <vector>
  #include <iostream>
  #include <algorithm>
  using namespace std;
  
  
  int main() {
      /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
      return 0;
  }
  `,
  python: `# Enter your code here. Read input from STDIN. Print output to STDOUT`,
  javascript: `function processData(input) {
    //Enter your code here
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
`,
};
const choices = [
  { title: "Java", value: "java" },
  { title: "C", value: "c" },
  { title: "C++", value: "cpp" },
  { title: "Python", value: "python" },
  { title: "JavaScript", value: "javascript" },
  { title: "Regular Expression", value: "regularexpression" },
];

const CodeEditor = () => {
  const classes = useStyles();
  const { id, contestId, challengeId } = useParams();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState("java");
  const [textCode, setTextCode] = useState("");
  const context = useContext(ChallengeContext);
  const genrateTab = (arr) => {
    return arr.map((item, index) => {
      if (item.output_real !== undefined) {
        //correct code return result
        return {
          eventKey: "TestCase " + index,
          title: (
            <span>
              TestCase {index}{" "}
              {item.correctAns ? (
                <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
              ) : (
                <ImCross className={`${classes.Icon} ${classes.IconFail}`} />
              )}
            </span>
          ),
          TabComponent: (
            <TestCaseProblem
              title={
                item.correctAns
                  ? "Congratulations, you passed the sample test case."
                  : "Your code did not pass this test case."
              }
              input={item.input_data}
              outputExpect={item.output_data}
              outputReal={item.output_real}
            />
          ),
        };
      } else {
        //there is error in code
        return {
          eventKey: "TestCase " + index,
          title: (
            <span>
              TestCase {index}{" "}
              {<ImCross className={`${classes.Icon} ${classes.IconFail}`} />}
            </span>
          ),
          TabComponent: (
            <TestCaseProblem
              title={item.errorType}
              error
              compilerMsg={item.stderr}
            />
          ),
        };
      }
    });
  };
  const handleCodeApi = async (ArrTestCases) => {
    let responseData = [];
    context.setLoading(true);
    return await axios
      .post("/run_challenge_code", {
        code: textCode,
        language: language,
        challengeId: challengeId,
      })
      .then((res) => {
        responseData = res.data.dataResponse;
        console.log(responseData);
        if (responseData.length > 0)
          return ArrTestCases?.map((item, index) => {
            console.log("Send Request");
            console.log("Get Result", responseData[index]);
            context.setLoading(false);
            context.testCases.setVal({ ...context.testCases.val, show: true });
            if (responseData[index][0]) {
              return {
                ...item,
                output_real: responseData[index][1],
                correctAns:
                  item.output_data.trim() == responseData[index][1].trim(),
              };
            } else {
              return {
                ...item,
                errorType: "Run Time Error",
                stderr: responseData[index][2],
              };
            }
          });
      })
      .catch((err) => {
        context.setLoading(false);
        const stderr = err.response?.data.stderr;
        console.log("stderr: " + stderr);
        console.log("Error Type:", "Run Time Error", "&&", "stderr:", stderr);
        context.setLoading(false);
        context.testCases.setVal({ ...context.testCases.val, show: true });
        return [
          {
            ...ArrTestCases[0],
            errorType: "Compile Time Error",
            stderr: stderr,
          },
        ];
      });
  };
  const buildTableUI = async () => {
    const { testCases } = context.challengeData;
    const runTestCases = await handleCodeApi(testCases);
    console.log("runTestCases ===== ", runTestCases);

    const TabsRes = genrateTab(runTestCases);
    context.testCases.setVal({
      ...context.testCases.val,
      show: true,
      tabContent: TabsRes,
    });
  };
  const handleRunCode = async () => {
    switch (language) {
      case "java":
        buildTableUI("java");
        break;
      case "c":
      case "cpp":
        buildTableUI("c");
        break;
      case "python":
        buildTableUI("python");
        break;
      case "javascript":
        buildTableUI("javascript");
        break;
      default:
        break;
    }
  };
  const handleSubmitCode = async () => {
    axios
      .post("/student-challenge-submissions", {
        code: textCode,
        language: language,
        challengeId: challengeId,
        courseNumber: id,
        contestId: contestId,
      })
      .then((res) => {
        const submissionId = res.data.submissionId;
        navigate(
          `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/${submissionId}`
        );
      })
      .catch((error) => {
        console.log(error);
        //********************************** */
        if (
          error?.response?.data?.message === "No more submissions, time ended"
        ) {
          toastError("No more submissions, time ended");
        } else {
          toastError("there is an error resubmit your code");
        }
      });
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("challenge " + challengeId)) {
      const storedData = JSON.parse(
        localStorage.getItem("challenge " + challengeId)
      );
      console.log(storedData.language);
      setLanguage(storedData.language);
      setTextCode(storedData.code);
    } else {
      setTextCode(defaultLang[language]);
    }
    setLoading(false);
  }, []);
  if (!loading) {
    localStorage.setItem(
      "challenge " + challengeId,
      JSON.stringify({
        language: language,
        code: textCode,
      })
    );
  }
  return (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.Row} ${classes.RowSelect}`}>
        <Col className={`${classes.Col} ${classes.ColSelect} `}>
          <span>Dark mode:</span>
          <Switch
            checked={dark}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#1e1e1e"
            onChange={(e) => {
              setDark(e);
            }}
          />
          <SelectionGroup
            choices={choices}
            language={{
              value: language,
              setValue: (val) => {
                setLanguage(val);
                setTextCode(defaultLang[val]);
              },
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col className={classes.Col}>
          <Editor
            height={"400px"}
            className={classes.Editor}
            defaultLanguage="java"
            defaultValue={defaultLang[language]}
            language={language}
            value={textCode}
            theme={dark ? "vs-dark" : ""}
            onChange={(e) => {
              setTextCode(e);
            }}
            options={{ padding: "0" }}
          />
        </Col>
      </Row>
      <Row className={`${classes.Row} ${classes.Buttons}`}>
        <Col className={`${classes.Col} ${classes.ColSelect}`}>
          <ButtonRank
            text={"Run Code"}
            onClick={handleRunCode}
            disabled={context.loading}
          />
          <ButtonRank
            text={"Submit Code"}
            onClick={handleSubmitCode}
            disabled={context.loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
