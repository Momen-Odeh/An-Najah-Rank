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
    // border: "none",
    // resize: "none",
    // minHeight: "100px",
    // overflow: "hidden",
    lineHeight: "1.73",
    fontFamily: "'Source Code Pro', monospace",
    // "&:focus": {
    //   boxShadow: "none !important",
    // },
    // height: "400px",
  },
});

export default useStyles;
