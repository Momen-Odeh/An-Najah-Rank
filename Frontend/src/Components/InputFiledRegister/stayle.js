import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  label: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    fontWeight: "500",
    lineHeight: "19.5px",
    color: "#999999",
    padding: "0",
    margin: "0",
    marginBottom: "5px",
  },
  icon: {
    fontSize: "20px",
    color: "#0e141e",
    marginRight: "10px",
  },
  iconPassword: {
    width: "25px",
    height: "25px",
    color: "#999999",
    marginLeft: "10px",
  },
  InputGroup: {
    backgroundColor: "white",
    border: "none",
    padding: "0",
    margin: "0",
    borderBottom: ({ msg }) =>
      msg ? "2px solid #e40506" : "solid 2px #999999",
    borderRadius: "0",
    paddingBottom: "5px",
    transition: "0.5s",
    "&:hover ": {
      borderBottom: "solid 2px #000842",
    },
  },
  InputFiled: {
    padding: "2px 5px",
    margin: "0",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "24px",
    color: "#000842",
    "&::placeholder": {},
    "&:focus": {
      boxShadow: "none",
    },
  },
  msg: {
    color: "#e40506 !important",
    fontWeight: "500",
  },
});

export default useStyles;
