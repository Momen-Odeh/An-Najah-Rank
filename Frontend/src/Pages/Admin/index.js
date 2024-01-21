import ChallengeTabs from "../../Components/ChallengTabs";
import ProfessorsRequests from "./ProfessorsRequests";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../../Components/Text";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Loader from "../../Components/Loader";
import Professors from "./Professors";
import Students from "./Students";
import Statistics from "./Statistics";
import axios from "axios";
import { toastError } from "../../Utils/toast";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [adminData, setAdminData] = useState();
  const navigate = useNavigate();
  const tabs = [
    {
      title: "Professors Requests",
      eventKey: "professors-requests",
      TabComponent: (
        <ProfessorsRequests pendingProfessors={adminData?.pendingProfessors} />
      ),
      urlPattern: "/admin/professors-requests",
    },
    {
      title: "Professors",
      eventKey: "professors",
      TabComponent: (
        <Professors activeProfessors={adminData?.activeProfessors} />
      ),
      urlPattern: "/admin/professors",
    },
    {
      title: "Students",
      eventKey: "students",
      TabComponent: <Students activeStudents={adminData?.activeStudents} />,
      urlPattern: "/admin/students",
    },
    {
      title: "Statistics",
      eventKey: "Statistics",
      TabComponent: <Statistics topStudents={adminData?.topStudents} />,
      urlPattern: "/admin/statistics",
    },
  ];

  useEffect(() => {
    axios
      .get("/admin")
      .then((response) => {
        // console.log(response);
        setAdminData(response.data);
        setLoadingPage(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //************* guard done ************************ */
          if (error?.response?.data?.message === "Access Denied") {
            toastError("Invalid Access");
            navigate("/");
          } else {
            toastError("Invalid Access");
            navigate("/log-in");
          }
        } else {
          setLoadingPage(false);
          console.log(error);
        }
      });
  }, []);
  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid style={{ maxWidth: "1200px" }}>
      <Row className="mb-3">
        <Col>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={"Welcome Back"}
            size="26px"
            fontFamily="Open Sans"
            wegiht="600"
            color="#0e141e"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChallengeTabs ListTabs={tabs} PaddingTop="0" />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
