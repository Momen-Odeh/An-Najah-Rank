import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Text: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: ({ wegiht }) => wegiht,
    fontSize: ({ size }) => size,
    lineHeight: ({ height }) => height,
    color: ({ color }) => color,
    padding: "0",
    margin: "0",
  },
});

export default useStyles;
