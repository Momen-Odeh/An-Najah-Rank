import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  Container: {
    width: "100%",
    // backgroundColor: "whitesmoke",
    padding: "20px",
    boxShadow: "0 3px 10px 0 rgba(0,0,0,.1)",
  },
  Row: { gap: "20px", justifyContent: "center" },
  Col: {},
  CirularCol: {
    width: "130px",

    // backgroundColor: "white",
  },
  ColProgresses: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: "250px",
  },
  CircularProgressCol: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  CircularProgressbar: {},
});
export default useStyle;
