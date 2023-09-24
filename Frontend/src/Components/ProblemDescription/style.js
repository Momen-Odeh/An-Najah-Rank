import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Row: {
    justifyContent: "space-between",
  },
  Col1: {
    border: "1px solid red",
    margin: "0",
    padding: "0",
  },
  Col2: {
    borderBottom: "1px solid #c2c7d0",
    margin: "0",
    padding: "0",
    paddingBottom: "10px",
  },
});

export default useStyles;
