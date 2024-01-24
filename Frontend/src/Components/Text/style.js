import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  Text: {
    fontFamily: ({ fontFamily }) => ` '${fontFamily}', sans-serif `,
    fontWeight: ({ wegiht }) => wegiht,
    fontSize: ({ size }) => size,
    lineHeight: ({ height }) => height,
    color: ({ color }) => color,
    whiteSpace: ({ whiteSpace }) => (whiteSpace ? "pre-wrap" : ""),
    padding: "0",
    margin: "0",
    cursor: ({ cursor }) => cursor,
    transition: "0.5s",
    "&:hover": {
      textDecoration: ({ hover }) => (hover ? "underline" : ""),
    },
    // wordWrap: "break-word",
    // whiteSpace: "normal",
  },
});

export default useStyles;
