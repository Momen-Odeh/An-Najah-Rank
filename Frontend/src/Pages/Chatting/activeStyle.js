import { createUseStyles } from "react-jss";

const activeUseStyle = createUseStyles({
  active: {
    backgroundColor: ({ active }) => (active ? "#f0f0f0" : "white"),
  },
});

export default activeUseStyle;
