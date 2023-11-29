import React from "react";
import { Container } from "react-bootstrap";
import { BeatLoader, PropagateLoader } from "react-spinners";
const Loader = ({ internal }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      {internal ? (
        <BeatLoader color="#0e141e" size={20} />
      ) : (
        <PropagateLoader color="#0e141e" size={30} />
      )}
    </Container>
  );
};

export default Loader;
