import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  form: {
    // border: "1px solid red",
    padding: "0",
    margin: "0",
  },
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
    width: "17px",
    height: "17px",
    color: "#000842",
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
    borderBottom: "solid 2px #999999",
    borderRadius: "0",
    paddingBottom: "5px",
    "&:hover ": {
      borderBottom: "solid 2px #000842",
    },
  },
  InputFiled: {
    padding: "0",
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
});

export default useStyles;
