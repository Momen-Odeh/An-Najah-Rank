import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Breadcrumb: {
    background: "#fff",
    padding: "8px 0",
    paddingTop: '15px',
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
