import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  Container: {
    width: "80%",
    backgroundColor: "whitesmoke",
  },
  Row: {},
  Col: {},
  CirularCol: {
    width: "120px",
    backgroundColor: "white",
  },
  CircularProgressbar: {},
  progressBar: {
    backgroundColor: (color) => {
      console.log("in color", color);
      return color;
    },
    "& .progress-bar": {
      backgroundColor: "black",
    },
  },
  progressBarHead: {
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "space-between",
  },
});
export default useStyle;
