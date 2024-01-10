import React from "react";
import useStyles from "./style";

const SampleContainer = ({ data, backgroundColor = "#f4faff", border }) => {
  const classes = useStyles({ backgroundColor, border });
  return (
    <pre
      className={classes.Sample}
      dangerouslySetInnerHTML={{
        __html: data,
      }}
    />
  );
};

export default SampleContainer;
