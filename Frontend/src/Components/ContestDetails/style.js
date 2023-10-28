import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Container: {
    padding: "0",
    margin: "0",
  },
  ColInputFiled: {
    maxWidth: "700px",
    minWidth: "300px",
  },
  TitleFiled: {
    width: "200px",
  },
  ActionBtns: {
    maxWidth: "700px",
    display: "flex",
    justifyContent: "space-between",
    gap: "5px",
  },
  Loaderspace: {
    width: "200px",
    "@media (max-width: 535px)": {
      width: "0px",
    },
  },
  Loader: {
    maxWidth: "700px",
    textAlign: "center",
  },
});
export default useStyles;
