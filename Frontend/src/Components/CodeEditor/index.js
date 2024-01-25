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
import { useNavigate, useParams } from "react-router-dom";
import { toastError } from "../../Utils/toast";

const choices = [
  { title: "Java", value: "java" },
  { title: "C", value: "c" },
  { title: "C++", value: "cpp" },
  { title: "Python", value: "python" },
  { title: "JavaScript", value: "javascript" },
  { title: "Regex", value: "Regex" },
];

const CodeEditor = () => {
  const classes = useStyles();
  const { id, contestId, challengeId } = useParams();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [defaultLang, setDefaultLang] = useState({});
  const [language, setLanguage] = useState("");
  const [textCode, setTextCode] = useState("");
  const context = useContext(ChallengeContext);
  console.log("language", language);
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
        buildTableUI("c");
        break;
      case "cpp":
        buildTableUI("cpp");
        break;
      case "python":
        buildTableUI("python");
        break;
      case "javascript":
        buildTableUI("javascript");
        break;
      case "regularexpression":
        buildTableUI("regularexpression");
        break;
      default:
        break;
    }
  };
  const handleSubmitCode = async () => {
    context.setLoading(true);
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
        context.setLoading(false);
        navigate(
          `/courses/${id}/contests/${contestId}/challenges/${challengeId}/submissions/${submissionId}`
        );
      })
      .catch((error) => {
        context.setLoading(false);
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
    const defaultLangObject = {};
    const challengeLanguage = context.challengeData.challengeLanguage;
    for (let i = 0; i < challengeLanguage.length; i++) {
      const item = challengeLanguage[i];
      const cho = choices.find((ch) => ch.title === item.language);
      defaultLangObject[cho.value] = item.content;
    }
    setDefaultLang(defaultLangObject);

    if (localStorage.getItem("challenge " + challengeId)) {
      const storedData = JSON.parse(
        localStorage.getItem("challenge " + challengeId)
      );
      console.log(storedData.language);
      setLanguage(storedData.language);
      setTextCode(storedData.code);
    } else {
      const lang = choices?.filter(
        (item) =>
          context.challengeData.challengeLanguage[0].language === item.title
      )[0]?.value;
      setTextCode(defaultLang[lang]);
      setLanguage(lang);
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
            choices={choices.filter((item) =>
              context.challengeData.challengeLanguage.find(
                (lang) => lang.language === item.title
              )
            )}
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
