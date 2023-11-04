import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  editorContainer: {
    "& .ql-editor": {
      minHeight: "120px",
    },
  },
  msg: {
    color: "#e40506 !important",
    fontWeight: "500",
  },
});

export default useStyle;
