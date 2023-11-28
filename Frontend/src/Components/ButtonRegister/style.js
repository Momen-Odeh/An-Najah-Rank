import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Button: {
    width: "100%",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    fontSize: "17px",
    lineHeight: "25.5px",
    color: "#FFFFFF",
    margin: "0",
    backgroundColor: "#0C21C1",
    borderRadius: "32px",
    "&:focus": {
      boxShadow: "none",
    },
  },
});

export default useStyles;
