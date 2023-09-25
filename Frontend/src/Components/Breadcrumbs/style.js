import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Breadcrumb: {
    background: "#fff",
    borderBottom: "1px solid #e0e4e8",
    padding: "25px 0",
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
