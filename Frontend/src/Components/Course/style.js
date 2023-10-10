import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  RowCourse: {
    // border: "1px solid red",
    padding: "20px 0px",
    boxShadow: "0 3px 10px 0 rgba(0,0,0,.1)",
  },
  ColImg: {
    // border: "1px solid blue",
  },
  Img: {
    width: "100%",
    // height: "150px",
    objectFit: "contain",
    borderRadius: "15px",
  },
  ColInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    // padding: "15px 10px",
  },
});

export default useStyles;
