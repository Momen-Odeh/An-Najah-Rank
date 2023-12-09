import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  progressBar: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    "& .progress-bar": {
      backgroundColor: ({ color }) => color,
    },
    cursor: "pointer",
  },
  progressBarHead: {
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
});
export default useStyle;
