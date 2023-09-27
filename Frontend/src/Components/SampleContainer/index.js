import React from "react";
import useStyles from "./style";

const SampleContainer = ({ data, backgroundColor = "#f4faff", border }) => {
  const classes = useStyles({ backgroundColor, border });
  return <pre className={classes.Sample}> {data}</pre>;
};

export default SampleContainer;
