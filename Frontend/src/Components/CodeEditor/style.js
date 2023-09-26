import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Container: {
    border: "1.5px solid #c2c7d0",
  },
  Row: {
    backgroundColor: "#f8f9fa",
    padding: "10px 15px",
  },
  ColSelect: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: "15px",
  },
  Col: {
    margin: "0",
    padding: "0",
  },
});

export default useStyles;
