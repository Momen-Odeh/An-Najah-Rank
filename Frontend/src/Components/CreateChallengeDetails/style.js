import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
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
  ImgPreview: {
    width: "100%",
    height: "400px",
    borderRadius: "5px",
    // objectFit: "contain",
  },
});

export default useStyle;
