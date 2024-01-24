import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Row: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  AddCol: {
    // backgroundColor: "red",
  },
  iconColor: {
    marginLeft: "10px",
    cursor: "pointer",
    "&:hover": {
      color: "#4691f6 !important",
    },
  },
});

export default useStyles;
