import React from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathContent = location.pathname.split("/").filter(Boolean);
  let urlPath = "";
  const path = pathContent.map((item) => {
    urlPath += "/" + item;
    return { title: item, url: urlPath };
  });
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
