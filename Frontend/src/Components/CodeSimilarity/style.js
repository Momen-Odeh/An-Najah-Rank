import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    // backgroundColor: "gray",
    maxWidth: "1200px",
    padding: "30px 10px",
  },
  RowCont: {
    padding: "0",
    margin: "0",
  },
  Row: {
    // backgroundColor: "pink",
    padding: "0",
    margin: "0",
    backgroundColor: "#f5f5f5",
    // borderBottom: "2px solid #dddddd",
    // gap: "5px",
    boxShadow: "0 3px 10px 0 rgba(0,0,0,.1)",
  },
  Col: {
    padding: "0",
    margin: "0",
  },
  ColCenter: {
    textAlign: "center",
    marginBottom: "30px",
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
