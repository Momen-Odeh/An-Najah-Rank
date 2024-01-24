import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  RowCreate: {
    gap: "20px",
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
