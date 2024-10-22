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
  Buttons: {
    borderTop: "1.5px solid #c2c7d0",
  },
  RowSelect: {
    borderBottom: "1.5px solid #c2c7d0",
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

export default useStyles;
