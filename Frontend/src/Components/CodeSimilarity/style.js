import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    // backgroundColor: "gray",
  },
  Row: {
    // backgroundColor: "pink",
    backgroundColor: "#f5f5f5",
    // borderBottom: "2px solid #dddddd",
  },
  Col: {
    padding: "0",
    margin: "0",
  },
  MyCode: {
    // backgroundColor: "cyan",
  },
  SimilarCodes: {
    // backgroundColor: "mediumseagreen",
    // border: "2px solid #dddddd",
    // height: "100",
  },
  AllTabs: {
    padding: "10px 20px",
    // paddingTop: "30px",
    borderTop: "2px solid #dddddd",
    borderRadius: "5px",
    // background: "red",
    // height: "100%",
  },
  AllTabsRow: {
    cursor: "pointer",
    transition: "0.3s",
    padding: "10px 0",
    borderBottom: "2px solid #dddddd",
    "&:hover": {
      backgroundColor: "#c2c2c2",
    },
  },
  AllTabsCol: {},
});

export default useStyles;
