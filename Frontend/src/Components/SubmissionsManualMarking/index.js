import React, { useEffect, useState } from "react";
import ChallengeTabs from "../ChallengTabs";
import TabTable from "../TabTable";
import { ImCross } from "react-icons/im";
import { Col, Container, Row } from "react-bootstrap";
import ButtonRank from "../ButtonRank";
import SubmissionTab from "./SubmissionTab";
import { FaCheck } from "react-icons/fa";
import TestCaseProblem from "../TestCaseProblem";
import useStyle from "./style";
import axios from "axios";
const SubmissionsManualMarking = () => {
  const classes = useStyle();
  const [testCases, setTestCases] = useState([
    {
      id: 67,
      input_data: "10 5",
      is_sample: 0,
      output_data: "15",
      strength: 15,
    },
    {
      id: 68,
      input_data: "2 4",
      is_sample: 1,
      output_data: "6",
      strength: 0,
    },
    {
      id: 69,
      input_data: "4 4",
      is_sample: 0,
      output_data: "8",
      strength: 10,
    },
  ]);
  const sumStrength = testCases?.reduce(
    (sum, testCase) => sum + testCase.strength,
    0
  );
  const [studentSubmissions, setStudentSubmissions] = useState([
    {
      code: 'import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\n class Main {\n    int arraysize;\n    int[][] data;\n    int M = (int) Double.NEGATIVE_INFINITY;\n\n    Main() {\n        Scanner input = new Scanner(System.in);\n        arraysize = Integer.parseInt(input.nextLine());\n        data = new int[arraysize][arraysize];\n\n        for (int i = 0; i < arraysize; i++) {\n            String da = input.nextLine();\n            String[] qq = da.split(",");\n\n            for (int j = 0; j < qq.length; j++)\n                data[i][j] = Integer.parseInt(qq[j]);\n        }\n    }\n\n    int f(int i, int j) {\n        if (i == arraysize - 1 && j == arraysize - 1) return data[i][j];\n\n        int n1 = 0, n2 = 0;\n        if (j < arraysize && i < arraysize) {\n            n1 = data[i][j] + f(i, j + 1);\n            n2 = data[i][j] + f(i + 1, j);\n        }\n\n        if (n1 < n2) return n2;\n        else return n1;\n    }\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */\n        Main sol = new Main();\n        int Y = sol.f(0, 0);\n\n        for (int i = 0; i < sol.arraysize; i++) {\n            for (int j = 0; j < sol.arraysize; j++) {\n                int ui = sol.f(i, j);\n                if (ui > Y) Y = ui;\n            }\n        }\n\n        System.out.println(Y);\n    }\n}',
      compileError: null,
      language: "java",
      score: 0.0,
      submissionDate: "Fri, 16 Nov 2023 15:06:58 GMT",
      submissionId: 7,
      submissionStatus: false,
      manualMark: false,
      testCaseOutput: [
        {
          status: 0,
          stderr:
            'Exception in thread "main" java.lang.NumberFormatException: For input string: "10 5"\n\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:668)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:784)\n\tat Main.<init>(javaTest.java:14)\n\tat Main.main(javaTest.java:41)\n',
          stdout: null,
          testCaseId: 67,
        },
        {
          status: 0,
          stderr:
            'Exception in thread "main" java.lang.NumberFormatException: For input string: "2 4"\n\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:668)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:784)\n\tat Main.<init>(javaTest.java:14)\n\tat Main.main(javaTest.java:41)\n',
          stdout: null,
          testCaseId: 68,
        },
        {
          status: 0,
          stderr:
            'Exception in thread "main" java.lang.NumberFormatException: For input string: "4 4"\n\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:668)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:784)\n\tat Main.<init>(javaTest.java:14)\n\tat Main.main(javaTest.java:41)\n',
          stdout: null,
          testCaseId: 69,
        },
      ],
    },
    {
      code: 'import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\n class Main {\n    int arraysize;\n    int[][] data;\n    int M = (int) Double.NEGATIVE_INFINITY;\n\n    Main() {\n        Scanner input = new Scanner(System.in);\n        arraysize = Integer.parseInt(input.nextLine());\n        data = new int[arraysize][arraysize];\n\n        for (int i = 0; i < arraysize; i++) {\n            String da = input.nextLine();\n            String[] qq = da.split(",");\n\n            for (int j = 0; j < qq.length; j++)\n                data[i][j] = Integer.parseInt(qq[j]);\n        }\n    }\n\n    int f(int i, int j) {\n        if (i == arraysize - 1 && j == arraysize - 1) return data[i][j];\n\n        int n1 = 0, n2 = 0;\n        if (j < arraysize && i < arraysize) {\n            n1 = data[i][j] + f(i, j + 1);\n            n2 = data[i][j] + f(i + 1, j);\n        }\n\n        if (n1 < n2) return n2;\n        else return n1;\n    }\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */\n        Main sol = new Main();\n        int Y = sol.f(0, 0);\n\n        for (int i = 0; i < sol.arraysize; i++) {\n            for (int j = 0; j < sol.arraysize; j++) {\n                int ui = sol.f(i, j);\n                if (ui > Y) Y = ui;\n            }\n        }\n\n        System.out.println(Y);\n    }\n}',
      compileError: null,
      language: "java",
      score: 100,
      submissionDate: "Fri, 17 Nov 2023 15:06:58 GMT",
      submissionId: 8,
      submissionStatus: false,
      manualMark: true,
      testCaseOutput: [
        {
          status: 1,
          stderr: null,
          stdout: 15,
          testCaseId: 67,
        },
        {
          status: 1,
          stderr: null,
          stdout: 6,
          testCaseId: 68,
        },
        {
          status: 0,
          stderr: null,
          stdout: 10,
          testCaseId: 69,
        },
      ],
    },
  ]);
  const [submissionId, setSubmissionId] = useState(
    studentSubmissions[0]?.submissionId
  );

  const listTabs = studentSubmissions.map((item, index) => ({
    eventKey: item.submissionId,
    title: "Submission " + index,
    TabComponent: <SubmissionTab submissionData={item} key={index} />,
  }));

  const submission = studentSubmissions?.find(
    (submission) => submission.submissionId == submissionId
  );
  const testCasesTab = testCases?.map((item, index) => {
    if (submission?.testCaseOutput[index].stdout && !submission?.compileError) {
      //correct code return result
      return {
        eventKey: "TestCase " + index,
        title: (
          <span>
            TestCase {index} ({((item.strength / sumStrength) * 100).toFixed(1)}
            %)
            {submission.testCaseOutput[index].status ? (
              <FaCheck className={`${classes.Icon} ${classes.IconPass}`} />
            ) : (
              <ImCross className={`${classes.Icon} ${classes.IconFail}`} />
            )}
          </span>
        ),
        TabComponent: (
          <TestCaseProblem
            title={
              submission.testCaseOutput[index].status
                ? "Congratulations, you passed the sample test case."
                : "Your code did not pass this test case."
            }
            input={item.input_data}
            outputExpect={item.output_data}
            outputReal={submission.testCaseOutput[index].stdout}
          />
        ),
      };
    } else {
      return {
        eventKey: "TestCase " + index,
        title: (
          <span>
            TestCase {index} ({((item.strength / sumStrength) * 100).toFixed(1)}
            %)
            {<ImCross className={`${classes.Icon} ${classes.IconFail}`} />}
          </span>
        ),
        TabComponent: (
          <TestCaseProblem
            title={
              submission.compileError ? "Compile Time Error" : "Run Time Error"
            }
            error
            compilerMsg={
              submission.compileError
                ? submission.compileError
                : submission.testCaseOutput[index].stderr
            }
          />
        ),
      };
    }
  });

  useEffect(() => {
    // axios
    //   .get(
    //     `/submissions-manual-marking?courseId=144&contestId=67&challengeId=30&studentUniversityNumber=11923929`
    //   )
    //   .then((res) => {
    //     setTestCases(res.data.testCases);
    //     setStudentSubmissions(res.data.submissions);
    //   })
    //   .catch(() => {});
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <ChallengeTabs ListTabs={listTabs} setActive={setSubmissionId} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <ChallengeTabs ListTabs={testCasesTab} PaddingTop="0px" />
        </Col>
      </Row>
    </Container>
  );
};

export default SubmissionsManualMarking;
