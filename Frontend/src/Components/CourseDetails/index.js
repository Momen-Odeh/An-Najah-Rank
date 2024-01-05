import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import * as XLSX from "xlsx";
import useStyle from "./Style";
import ButtonRank from "../ButtonRank";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputFiledRank from "../InputFiledRank";
import { validateUniversityNumber } from "../../Utils/Validation";
import LoaderRank from "../LoaderRank";
import { toastError } from "../../Utils/toast";
const CourseDetails = ({ operation, data = null, setData }) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({
    number: null,
    name: "",
    description: "",
    image: null,
    students: "",
    uploadImg: null,
  });
  console.log(details.students);
  const [errorMsg, setErrorMsg] = useState({
    number: null,
    name: null,
    description: null,
    image: null,
    students: null,
  });

  useEffect(() => {
    if (operation === "create") {
      axios
        .get("/is-admin-or-professor")
        .then((res) => {
          if (data) setDetails(data);
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
          }
        });
    } else if (data) setDetails(data);
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
        toastError("Please select a valid image file.");
        e.target.value = null;
        handleChange(null, "image", null);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith(".xlsx")) {
        handleFileUpload(file);
      } else {
        toastError("Please select a valid Excel file with .xlsx extension");
        e.target.value = null;
      }
    }
  };
  const handleGetStudentId = (data) => {
    let index1 = 0;
    let findIndex = -1;
    for (index1; index1 < data?.length; index1++) {
      let find = data[index1]?.indexOf("رقم الطالب");
      if (find >= 0) {
        findIndex = find;
        break;
      }
    }
    const studentsUniversityNumber = data
      ?.filter((_, index) => index > index1)
      .map((item) => item[findIndex]);
    handleChange(null, "students", studentsUniversityNumber);
  };
  const handleFileUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        handleGetStudentId(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleClick = async () => {
    setErrorMsg({
      number: !validateUniversityNumber(String(details.number))
        ? "must consist of digits and contain at least three digits."
        : null,
      name: !(details.name.length >= 3)
        ? "must consist at least 3 character."
        : null,
      description: !(details.description.length > 0)
        ? "must enter course description."
        : null,
      image: !details.image ? "should enter course background image" : null,
      students: !details.students
        ? "should enter Students Excel File with .xlsx extension"
        : null,
    });
    console.log(details.image && details.students && operation === "create");
    if (
      validateUniversityNumber(String(details.number)) &&
      details.name.length >= 3 &&
      details.description.length > 0 &&
      details.image &&
      details.students
    ) {
      try {
        console.log(1);
        setLoading(true);
        if (operation === "create") {
          await axios.post(`/courses`, {
            courseNumber: details.number,
            name: details.name,
            description: details.description,
            backgroundImage: details.image,
            studentsUniversityNumber: details.students,
          });
          const formData = new FormData();
          formData.append("image", details.uploadImg);
          await axios.put("/courseImg/" + details.number, formData);
        } else {
          await axios.put(`/courses/${id}`, {
            name: details.name,
            description: details.description,
          });
          if (details.uploadImg) {
            const formData = new FormData();
            formData.append("image", details.uploadImg);
            await axios.put("/courseImg/" + id, formData);
          }
          setData(details);
        }
        setLoading(false);
        navigate(`/administration/courses/${details.number}/moderators`);
      } catch (error) {
        toastError(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };
  return (
    <Container fluid>
      <Row className="mb-3 mt-2">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Course Number"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="text"
            name="number"
            id="input"
            onChange={handleChange}
            value={details.number}
            disabled={operation !== "create" || loading}
            size={"sm"}
            msg={errorMsg.number}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Course Name"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="text"
            name="name"
            id="input"
            onChange={handleChange}
            value={details.name}
            size={"sm"}
            msg={errorMsg.name}
            disabled={loading}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Description"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            as="textarea"
            name="description"
            id="textarea"
            rows={3}
            onChange={handleChange}
            value={details.description}
            msg={errorMsg.description}
            disabled={loading}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Background Image"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>

        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={classes.file}
            size={"sm"}
            msg={errorMsg.image}
            disabled={loading}
          />
          {details.image && (
            <img
              src={details.image}
              alt="Preview"
              className={`${classes.ImgPreview} mb-2 mt-4`}
            />
          )}
        </Col>
      </Row>

      {operation === "create" && (
        <Row className="mb-3">
          <Col xs={"auto"} className={classes.TitleFiled}>
            <Text
              fontFamily="Open Sans"
              text={"Students Excel File"}
              height={"40px"}
              wegiht={"600"}
            />
          </Col>

          <Col className={classes.ColInputFiled}>
            <InputFiledRank
              type="file"
              name="students"
              accept=".xlsx"
              onChange={handleFileChange}
              size={"sm"}
              msg={"should enter Students Excel File with .xlsx extension"}
              BorderColor={!errorMsg.students}
              disabled={loading}
            />
          </Col>
        </Row>
      )}
      {loading && (
        <Row>
          <Col xs={"auto"} className={classes.Loaderspace}></Col>
          <Col className={classes.Loader}>
            <LoaderRank loading={loading} />
          </Col>
        </Row>
      )}
      <Row className="mt-5">
        <Col Col xs={"auto"} className={classes.TitleFiled}></Col>
        <Col className={classes.ActionBtns}>
          <ButtonRank
            text={"Cancel Changes"}
            onClick={() => navigate("/administration/courses")}
            disabled={loading}
          />
          <ButtonRank
            text={"Save Changes"}
            onClick={handleClick}
            disabled={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
