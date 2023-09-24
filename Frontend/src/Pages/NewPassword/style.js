import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  Container: {
    boxSizing: "border-box",
    width: "480px",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 6px 16px 0 rgba(0,0,0,.2)",
    "@media (max-width: 767px)": {
      padding: "20px",
      width: "100%",
    },
  },
  Row: {},
  Col: {
    textAlign: "center",
  },
  center: {
    margin: "15px",
  },
});

export default useStyles;
