import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import InputFiledRank from "../InputFiledRank";
import useStyles from "./style";
import Text from "../Text";
import ModalRank from "../ModalRank";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
const ManageContests = ({ contests, setContests }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const header = [
    "Contest Name",
    "Contest Owner",
    "Start Date",
    "End Date",
    "",
  ];
  const [deleteModal, setDeleteModal] = useState({ show: false });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  console.log("contests", contests);
  const handelDeleteContest = () => {
    console.log(deleteModal);
    console.log(contests[deleteModal.index]);
    setLoading(true);
    axios
      .delete("/contest", {
        params: { contestsId: contests[deleteModal.index].id },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setContests(
          contests.filter((_, fIndex) => fIndex !== deleteModal.index)
        );
        setDeleteModal({ ...deleteModal, show: false });
      })
      .catch((error) => {
        setLoading(false);
        setDeleteModal({ ...deleteModal, show: false });
        console.log(error);
      });
  };
  return (
    <Container>
      <Row className={classes.Row}>
        <Col>
          <InputFiledRank
            type="text"
            width={"250px"}
            placeholder="Type context name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={"auto"} className={classes.AddCol}>
          <ButtonRank
            text={"Create Contest"}
            hoverBackgroundColor="#0e141e"
            onClick={() =>
              navigate(`/administration/courses/${id}/contests/create-contest`)
            }
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable
            TableHeader={header}
            TableData={contests
              ?.map((item, index) => ({
                name: item.name,
                ownerName: item.ownerName,
                startDate: item.startDate,
                endDate: item.endDate,
                action: (
                  <BiTrash
                    size={30}
                    color="#949494"
                    className={classes.iconColor}
                    onClick={() =>
                      setDeleteModal({
                        ...deleteModal,
                        show: true,
                        index: index,
                        name: item.name,
                      })
                    }
                  />
                ),
              }))
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )}
            url={contests
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map(
                (item) => `/administration/courses/${id}/contests/${item.id}`
              )}
          />
        </Col>
      </Row>
      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title="Delete Contest"
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={() => handelDeleteContest()}
            disabled={loading}
          />
        }
      >
        <Text
          text={
            "are you sure that want to delete the contest with Name " +
            deleteModal.name +
            "?"
          }
          size="0.9em"
          fontFamily="Open Sans"
          wegiht="600"
          color="#0e141e"
        />
      </ModalRank>
    </Container>
  );
};

export default ManageContests;
