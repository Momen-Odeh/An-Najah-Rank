import React from "react";
import Text from "../Text";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div className="m-2">
        <Text text={"404"} size="40px" wegiht="700" />
      </div>
      <div className="m-2">
        <Text text={"Not Found"} size="40px" wegiht="700" />
      </div>
    </div>
  );
};

export default NotFound;
