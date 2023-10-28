import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../Text";
import * as XLSX from "xlsx";
import useStyle from "./Style";
import ButtonRank from "../ButtonRank";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import InputFiledRank from "../InputFiledRank";
import { validateUniversityNumber } from "../../Utils/Validation";
import { toast } from "react-toastify";
import LoaderRank from "../LoaderRank";
const CourseDetails = ({ operation, data = null, setData }) => {
  const [loading, setLoading] = useState(false);
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
  const [errorMsg, setErrorMsg] = useState({
    number: null,
    name: null,
    description: null,
    image: null,
    students: null,
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
      students: !details.students ? "should enter Students Excel File" : null,
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
        setLoading(false);
        navigate(`/administration/courses/${details.number}/moderators`);
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    }
  };
  return (
    <Container fluid>
      <Row className="mb-3 mt-5">
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
              accept=".xls, .xlsx"
              onChange={handleFileChange}
              size={"sm"}
              msg={errorMsg.students}
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
