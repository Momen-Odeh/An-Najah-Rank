import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
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
  AuthCode: {
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    columnGap: "10px",
  },
  AuthCodeCell: {
    width: "50px",
    height: "50px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#000000",
    textAlign: "center",
  },
});

export default useStyles;
