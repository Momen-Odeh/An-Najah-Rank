import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Button: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    color: ({ color }) => color,
    fontSize: ({ size }) => size,
    border: ({ border }) => border,
    padding: "8px 15px",
    width: ({ width }) => width,
    "&:hover": {
      backgroundColor: ({ hoverBackgroundColor }) => hoverBackgroundColor,
      border: ({ border }) => border,
    },
    "&:focus": {
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: "#f0f0f4",
      color: "#39424E",
      border: "none",
    },
  },
});

export default useStyles;
