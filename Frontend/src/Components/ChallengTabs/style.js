import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Tabs: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#979faf",
    borderRadius: "5px",
    //
    backgroundColor: "#f8f9fa",
    border: "1px solid #C2C7D0",
    padding: "10px",
    paddingBottom: "1px",
    columnGap: "50px",
  },
  Tab: {
    color: "#39424e",
    background: "#f8f9fa",
    "&:focus": {
      outline: "none",
      borderBottomColor: "#fff",
    },
    "&:enabled": {
      //Not Selected
      borderBottom: "1px solid #C2C7D0",
    },
  },
  InnerTab: {
    paddingTop: ({ PaddingTop }) => PaddingTop,
  },
});

export default useStyles;
