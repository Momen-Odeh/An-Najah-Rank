import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Sample: {
    fontSize: "18px",
    color: " #39424E",
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    padding: "5px",
    margin: "0",
    border: ({ border }) => border,
  },
});

export default useStyles;
