import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import useStyles from "./style";
import { Col, Container, Form, Row } from "react-bootstrap";
import SelectionGroup from "../SelectionGroup";
import Switch from "react-switch";
import ButtonRank from "../ButtonRank";
import ChallengeContext from "../../Utils/ChallengeContext";
import axios from "axios";
const defaultLang = {
  java: `  import java.io.*;
  import java.util.*;
  
  public class Solution {
  
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
  const handleRunCode = async () => {
    console.log("Send Request");
    const codeResult = await axios.post("http://127.0.0.1:5001/java", {
      code: "class Main {  public static void main(String[] args) { System.out.println(5555);} }",
    });
    console.log("Get Result", codeResult.data);
    context.testCases.setVal({
      ...context.testCases.val,
      show: true, //!context.testCases.val.show,
    });
    // console.log(codeResult);
  };
  const handleSubmitCode = async () => {};
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
          <ButtonRank text={"Run Code"} onClick={handleRunCode} />
          <ButtonRank
            text={"Submit Code"}
            backgroundColor="#2ec866"
            color="#F0F0F4"
            onClick={handleSubmitCode}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
