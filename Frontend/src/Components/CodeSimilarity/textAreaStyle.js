import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Col: {
    padding: "0",
    margin: "0",
  },
  textAreaContainer: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "start",
    backgroundColor: "#f5f5f5",
    border: "2px solid #dddddd",
    borderRadius: "5px",
    height: "500px",
    minWidth: "300px",
    overflow: "scroll",
    whiteSpace: "nowrap",
    // width: "100%",

    // backgroundColor: "red",
  },
  lineNumbers: {
    width: "30px",
    backgroundColor: "#f5f5f5",
    top: "6px",
    position: "relative",
  },
  lineNumber: {
    textAlign: "center",
    padding: "1.84px",
    userSelect: "none",
  },
  textarea: {
    // maxWidth: "590px",
    lineHeight: "1.73",
    fontWeight: "600",
    fontFamily: "'Source Code Pro', monospace",
  },
});

export default useStyles;
