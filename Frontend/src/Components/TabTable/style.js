import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Table: {
    border: "1px solid #c2c7d0",
    // borderRadius: "15px",
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
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  tableHeader: {
    // textAlign: "center",
  },
});

export default useStyles;
