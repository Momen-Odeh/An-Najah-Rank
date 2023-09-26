import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Breadcrumb: {
    background: "#fff",
    padding: "15px 0",
    margin: "0",
  },
  item: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#979faf",
  },
  Link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      color: "#000",
    },
  },
});

export default useStyles;
