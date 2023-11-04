import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  button: {
    backgroundColor: "#545b62",
    fontSize: "14px",
  },
  RowAddModerators: {
    maxWidth: "650px",
    gap: "20px",
  },
  ColAddModerators: {
    minWidth: "280px",
  },
  BtnCol: {
    padding: "0",
    margin: "0",
    width: "20px",
  },
  RowNoWrap: {
    flexWrap: "nowrap",
  },
});

export default useStyle;
