import React from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import ButtonRank from "../ButtonRank";
import Table from "react-bootstrap/Table";
const renderValue = (value) => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  } else if (Array.isArray(value)) {
    return value.join(", ");
  } else if (typeof value === "object" && value !== null) {
    return Object.values(value).join(", ");
  }
};

const TabTable = ({ TableHeader, TableData, url = null }) => {
  const classes = useStyles();
  let values;
  const setValues = (e) => {
    values = e;
  };
  return (
    <Table responsive striped className={classes.Table}>
      <thead className={classes.tableHeader}>
        <tr className={classes.tableRow}>
          {TableHeader?.map((item, index) => (
            <th key={index}>
              <Text text={item} color="#39424E" size="1em" />
            </th>
          ))}
        </tr>
      </thead>
      {/* {console.log(url)} */}
      <tbody>
        {TableData?.map((item, index) =>
          url ? (
            <tr className={classes.tableRow} key={index}>
              {setValues(Object.values(item))}
              {values?.map((val, indexIN) =>
                TableHeader[indexIN] === "" ? (
                  <td key={indexIN} className={classes.TableData}>
                    {val}
                  </td>
                ) : (
                  <td key={indexIN} className={classes.TableData}>
                    <Link to={url[index]} className={classes.link}>
                      {renderValue(val)}
                    </Link>
                  </td>
                )
              )}
            </tr>
          ) : (
            <tr key={index} className={classes.tableRow}>
              {setValues(Object.values(item))}
              {values?.map((val, indexIN) => (
                <td key={indexIN} className={classes.TableData}>
                  {val}
                </td>
              ))}
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default TabTable;
