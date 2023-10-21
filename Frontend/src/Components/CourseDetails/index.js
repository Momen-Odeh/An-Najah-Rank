import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Text from "../Text";
import * as XLSX from "xlsx";
import useStyle from "./Style";
import ButtonRank from "../ButtonRank";
import { useEffect } from "react";
import AlertComponent from "../Alert";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
const CourseDetails = ({ operation, data = null, setData }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { id } = useParams();
  const [details, setDetails] = useState({
    number: null,
    name: "",
    description: "",
    image: null,
    students: "",
    uploadImg: null,
  });
  console.log(details);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "warning",
  });
  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);
  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value, type, checked, files } = e.target;
      const newValue =
        type === "checkbox" ? checked : type === "file" ? files[0] : value;
      setDetails({ ...details, [name]: newValue });
    } else {
      setDetails({ ...details, [nameVal]: val });
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setDetails({
          ...details,
          image: URL.createObjectURL(e.target.files[0]),
          uploadImg: e.target.files[0],
        });
      } else {
        alert("Please select a valid image file.");
        e.target.value = null;
        handleChange(null, "image", null);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
        handleFileUpload(file);
      } else {
        alert("Please select a valid Excel file (.xls or .xlsx).");
        e.target.value = null;
      }
    }
  };
  const handleFileUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        handleChange(null, "students", jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleClick = async () => {
    let thereError = false;
    setShowAlert(false);
    try {
      if (!details.number) {
        throw new Error("should enter course number");
      } else if (!details.name) {
        throw new Error("should enter course name");
      } else if (!details.description) {
        throw new Error("should enter course description");
      } else if (!details.image) {
        throw new Error("should enter course background image");
      } else if (!details.students && operation === "create") {
        throw new Error("should enter course students");
      }
    } catch (error) {
      setAlertData({ message: error.message, variant: "warning" });
      setShowAlert(true);
      thereError = true;
    }
    if (!thereError) {
      try {
        if (operation === "create") {
          const idIndex = details.students[0].indexOf("id");
          const studentsUniversityNumber = details.students
            .filter((_, index) => index !== 0)
            .map((item) => item[idIndex]);
          await axios.post(`http://localhost:5000/courses`, {
            courseNumber: details.number,
            name: details.name,
            description: details.description,
            backgroundImage: details.image,
            token: cookies.token,
            studentsUniversityNumber: studentsUniversityNumber,
          });
          const formData = new FormData();
          formData.append("image", details.uploadImg);
          await axios.put(
            "http://localhost:5000/courseImg/" + details.number,
            formData
          );
        } else {
          await axios.put(`http://localhost:5000/courses/${id}`, {
            name: details.name,
            description: details.description,
          });
          if (details.uploadImg) {
            const formData = new FormData();
            formData.append("image", details.uploadImg);
            await axios.put("http://localhost:5000/courseImg/" + id, formData);
          }
          setData(details);
        }
        navigate(`/course/${details.number}/moderators`);
      } catch (error) {
        setAlertData({
          message: error?.response?.data?.message,
          variant: "danger",
        });
        setShowAlert(true);
      }
    }
  };
  return (
    <Container>
      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Course Number"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="number"
              name="number"
              id="input"
              onChange={handleChange}
              value={details.number}
              disabled={operation !== "create"}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Course Name"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              id="input"
              onChange={handleChange}
              value={details.name}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Description"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="description"
              id="textarea"
              rows={3}
              onChange={handleChange}
              value={details.description}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Text
            fontFamily="Open Sans"
            text={"Background Image"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>

        <Col>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={classes.file}
          />
          {details.image && (
            <img
              src={details.image}
              alt="Preview"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
              }}
              className="mb-2"
            />
          )}
        </Col>
      </Row>

      {operation === "create" && (
        <Row>
          <Col md={2}>
            <Text
              fontFamily="Open Sans"
              text={"Students Excel File"}
              height={"40px"}
              wegiht={"600"}
            />
          </Col>

          <Col>
            <Form.Group>
              <Form.Control
                type="file"
                name="students"
                accept=".xls, .xlsx"
                onChange={handleFileChange}
                className={classes.file}
              />
            </Form.Group>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          {showAlert && (
            <AlertComponent
              message={alertData.message}
              variant={alertData.variant}
            />
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2}></Col>
        <Col md={8} className="d-flex justify-content-end">
          <ButtonRank text={"Cancel Changes"} />
          <span className="m-1"></span>
          <ButtonRank
            text={"Save Changes"}
            backgroundColor="#1cb557"
            hoverBackgroundColor="green"
            color="white"
            onClick={handleClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
