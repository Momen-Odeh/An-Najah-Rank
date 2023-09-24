import React from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ path }) => {
  const classes = useStyles();
  return (
    <div className={classes.Breadcrumb}>
      {path.map((item, index) => (
        <span className={classes.item} key={index}>
          {index !== 0 ? " > " : " "}
          <Link className={`${classes.Link} ${classes.item} `} to={item.url}>
            {item.title}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
