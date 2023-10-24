import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  add: {
    color: "darkgreen",
    "&:hover": {
      color: "green !important",
    },
  },
  remove: {
    color: "#D2001A",
    "&:hover": {
      color: "#FF1E00 !important",
    },
  },
  iconContainer: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  },
  details: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    border: "1px solid #ddd",
    marginTop: "10px",
    display: "inline-block",
    borderRadius: "5px",
    width: "200px",
  },
});

export default useStyle;
