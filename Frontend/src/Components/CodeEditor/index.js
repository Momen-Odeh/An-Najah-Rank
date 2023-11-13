import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import useStyles from "./style";
import { Col, Container, Form, Row } from "react-bootstrap";
import SelectionGroup from "../SelectionGroup";
import Switch from "react-switch";
import ButtonRank from "../ButtonRank";
import ChallengeContext from "../../Utils/ChallengeContext";
import axios from "axios";
import TestCaseProblem from "../TestCaseProblem";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import BackEndURI from "../../Utils/BackEndURI";
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
];

const CodeEditor = () => {
  const classes = useStyles();
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState("java");
  const [textHeight, setTextHeight] = useState("400px");
  const [textCode, setTextCode] = useState("");
  const context = useContext(ChallengeContext);
  // useEffect(() => {
  //   const lines = textCode.split("\n").length;
  //   const newHeight = Math.max(200, lines * 30);
  //   setTextHeight(`${newHeight}px`);
  // }, [textCode]);
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
  const handleCodeApi = async (ArrTestCases, lang) => {
    return await Promise.all(
      ArrTestCases.map(async (item, index) => {
        try {
          context.setLoading(true);
          context.testCases.setVal({ ...context.testCases.val, show: false });
          console.log("Send Request");
          const codeResult = await axios.post(BackEndURI + "/" + lang, {
            code: textCode,
          });
          console.log("Get Result", codeResult.data);
          context.setLoading(false);
          context.testCases.setVal({ ...context.testCases.val, show: true });
          return {
            ...item,
            output_real: codeResult.data.output,
            correctAns: item.output_data == codeResult.data.output,
          };
        } catch (err) {
          const { error, stderr } = err.response.data;
          console.log("Error Type:", error, "&&", "stderr:", stderr);
          context.setLoading(false);
          context.testCases.setVal({ ...context.testCases.val, show: true });
          return {
            ...item,
            errorType: error,
            stderr: stderr,
          };
        }
      })
    );
  };
  const buildTableUI = async (lang) => {
    const { testCases } = context.challengeData;
    const runTestCases = await handleCodeApi(
      testCases.filter((x) => x.is_sample === 1),
      lang
    );
    console.log("runTestCases ===== ", runTestCases);

    const TabsRes = genrateTab(runTestCases);
    context.testCases.setVal({
      ...context.testCases.val,
      show: true,
      tabContent: TabsRes,
    });
  };
  const handleRunCode = async () => {
    // console.log("1111111111111", language);
    // console.log("2222222222222", textCode);
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
        buildTableUI("JS");
        break;
      default:
        break;
    }
  };
  const handleSubmitCode = async () => {};
  useEffect(() => {
    setTextCode(defaultLang[language]);
  }, []);
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
            language={{ value: language, setValue: setLanguage }}
          />
        </Col>
      </Row>
      <Row>
        <Col className={classes.Col}>
          <Editor
            height={textHeight}
            className={classes.Editor}
            defaultLanguage="java"
            defaultValue={defaultLang[language]}
            language={language}
            value={defaultLang[language]}
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
