import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    width: "100%",
    border: "1px solid #c2c7d0",
  },
  Row: {
    padding: "15px",
    borderBottom: "1px solid #c2c7d0",
    alignItems: "center",
    "&:nth-child(even)": {
      backgroundColor: "#f8f9fa",
    },
  },
  Icon: {
    marginLeft: "10px",
  },
  IconPass: {
    color: "green",
  },
  IconFail: {
    color: "red",
  },
});

export default useStyles;
