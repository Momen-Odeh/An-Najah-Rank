import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import useStyles from "./style";
import { Col, Container, Form, Row } from "react-bootstrap";
import SelectionGroup from "../SelectionGroup";
import Switch from "react-switch";
const choices = [
  { title: "Java", value: "java" },
  { title: "C/C++", value: "cpp" },
  { title: "Python", value: "python" },
  { title: "JavaScript", value: "javascript" },
];
const CodeEditor = () => {
  const classes = useStyles();
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState("java");
  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>
        <Col className={`${classes.Col} ${classes.ColSelect}`}>
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
            height="200px"
            defaultLanguage="cpp"
            defaultValue="// some comment"
            language={language}
            theme={dark ? "vs-dark" : ""}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
