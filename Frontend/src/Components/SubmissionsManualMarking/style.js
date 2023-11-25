import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  date: {
    margin: "1px",
  },
  editorHeader: {
    borderBottom: "1px solid #c2c7d0",
    padding: "15px",
  },
  ColBorder: {
    border: "1px solid #c2c7d0",
    borderRadius: "5px",
    margin: "1px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  testCaseResult: {
    minWidth: "200px",
  },
  score: {
    marginLeft: "3px",
    width: "80px",
  },
  Icon: {
    textAlign: "center",
    marginLeft: "5px",
    fontSize: "15px",
  },
  IconPass: {
    color: "green",
  },
  IconFail: {
    color: "red",
  },
});

export default useStyle;
