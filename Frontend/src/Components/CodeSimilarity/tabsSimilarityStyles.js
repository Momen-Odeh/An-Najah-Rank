import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Tabs: {
    paddingTop: "5px",
    paddingLeft: "5px",
    backgroundColor: "#f5f5f5",
    // border: "2px solid #dddddd",
    borderBottom: "none",
    borderLeft: "none",
    borderTopLeftRadius: "5px",
    paddingBottom: "1px",
    // columnGap: "50px",
    fontWeight: "600",
  },
  Tab: {
    color: "#39424e",
  },
  InnerTab: {
    paddingTop: ({ PaddingTop }) => PaddingTop,
  },
});

export default useStyles;
