import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonRank from "../ButtonRank";
import TabTable from "../TabTable";
import InputFiledRank from "../InputFiledRank";
import useStyles from "./style";
import { BiTrash } from "react-icons/bi";
import Text from "../Text";
import ModalRank from "../ModalRank";
import axios from "axios";
const ManageCourses = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false });
  const [loading, setLoading] = useState(false);
  const header = ["Course Name", "Course Owner", "Moderators", ""];
  const classes = useStyles();
  const handelDeleteCourse = () => {
    console.log(deleteModal);
    console.log(courses[deleteModal.index]);

    setLoading(true);
    axios
      .delete("/course_data", {
        params: { courseId: courses[deleteModal.index].id },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setCourses(courses.filter((_, fIndex) => fIndex !== deleteModal.index));
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
      <Row className={classes.RowCreate}>
        <Col>
          <InputFiledRank
            type="text"
            placeholder="Type course name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width={"250px"}
          />
        </Col>
        <Col xs="auto">
          <ButtonRank
            text="Create Course"
            onClick={() => navigate(`/administration/courses/create-course`)}
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <TabTable
            TableHeader={header}
            TableData={courses
              .map((item, index) => ({
                name: item.name,
                owner: item.ownerName,
                moderators: item.moderators,
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
            url={courses
              .filter((word) =>
                word.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => `/administration/courses/${item.id}`)}
          />
        </Col>
      </Row>
      <ModalRank
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ ...deleteModal, show: false });
        }}
        title="Delete Course"
        footer={
          <ButtonRank
            text={"Yes"}
            hoverBackgroundColor="#0e141e"
            onClick={() => handelDeleteCourse()}
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

export default ManageCourses;
