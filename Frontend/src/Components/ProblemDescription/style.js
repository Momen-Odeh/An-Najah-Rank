import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Row: {
    justifyContent: "space-between",
  },
  Col: {
    margin: "0",
    padding: "0",
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
  LoaderCol: {
    textAlign: "center",
  },
});

export default useStyles;
