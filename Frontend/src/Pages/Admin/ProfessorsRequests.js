import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import TabTable from "../../Components/TabTable";
import Text from "../../Components/Text";
import useStyle from "./style";
import ModalRank from "../../Components/ModalRank";
import ButtonRank from "../../Components/ButtonRank";
import InputFiledRank from "../../Components/InputFiledRank";
const ProfessorsRequests = ({ pendingProfessors, setAdminData }) => {
  const classes = useStyle();
  const [professors, setProfessors] = useState(pendingProfessors);
  const [deleteModal, setDeleteModal] = useState({ show: false, index: -1 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleAccept = (universityNumber) => {
    setLoading(true);
    axios
      .put(`/admin/${universityNumber}`)
      .then(() => {
        setProfessors(
          professors.filter(
            (item) => item.universityNumber !== universityNumber
          )
        );
        setAdminData((prev) => {
          const data = {
            ...prev,
            activeProfessors: [
              ...prev.activeProfessors,
              professors?.filter(
                (item) => item.universityNumber === universityNumber
              )[0],
            ],
          };
          console.log("ddd>>>>", data);
          return data;
        });
        setDeleteModal({ show: false });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const handleReject = (universityNumber) => {
    setLoading(true);

    axios
      .delete(`/admin/${universityNumber}`)
      .then(() => {
        setProfessors(
          professors.filter(
            (item) => item.universityNumber !== universityNumber
          )
        );
        setDeleteModal({ show: false });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const header = ["Professor Name", "University Number", "Email", ""];
  const data = professors
    .map((item) => ({
      name: item.name,
      universityNumber: item.universityNumber,
      email: item.email,
      add: (
        <>
          <FaCheck
            size={24}
            className={classes.add}
            onClick={() =>
              setDeleteModal({
                show: true,
                title: "Add professor",
                body:
                  "are you sure that want to accept the professor with id " +
                  item.universityNumber +
                  "?",
                id: item.universityNumber,
                handelFunc: handleAccept,
              })
            } //handleAccept(item.universityNumber)
            title="click to accept professor"
          />
          <span className="ms-5"></span>
          <FaTimes
            size={24}
            className={classes.remove}
            onClick={() =>
              setDeleteModal({
                show: true,
                title: "Reject professor",
                body:
                  "are you sure that want to Reject the professor with id " +
                  item.universityNumber +
                  "?",
                id: item.universityNumber,
                handelFunc: handleReject,
              })
            } //handleReject(item.universityNumber)
            title="click to reject professor"
          />
        </>
      ),
    }))
    .filter((word) => word.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <Row className="mt-4 ">
        <Col xs={"auto"}>
          <Text text={"professors request"} size="30px" />
        </Col>
        <Col className="d-flex justify-content-end">
          <InputFiledRank
            type="text"
            placeholder="Type Professor Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width={"250px"}
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable TableHeader={header} TableData={data} />
        </Col>
      </Row>
      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title={deleteModal.title}
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={() => deleteModal.handelFunc(deleteModal.id)}
            disabled={loading}
          />
        }
      >
        <Text
          text={deleteModal.body}
          size="0.9em"
          fontFamily="Open Sans"
          wegiht="600"
          color="#0e141e"
        />
      </ModalRank>
    </Container>
  );
};

export default ProfessorsRequests;
