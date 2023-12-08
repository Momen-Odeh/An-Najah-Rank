import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyle from "./style";
import Text from "../Text";
import TextEditor from "../TextEditor";
import ButtonRank from "../ButtonRank";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import InputFiledRank from "../InputFiledRank";
import CheckRank from "../CheckRank";
import LoaderRank from "../LoaderRank";
import { toastError } from "../../Utils/toast";

const ContestsDetalis = ({ operation, data = null }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const { id, contestId } = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    startTime: null,
    hasEndTime: true,
    endTime: null,
  });

  const [errorMsg, setErrorMsg] = useState({
    name: null,
    description: null,
    startTime: null,
    hasEndTime: true,
    endTime: null,
  });
  useEffect(() => {
    if (operation === "create") {
      axios
        .get("/is-admin-or-professor", { params: { courseId: id } })
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
  const handleClick = async () => {
    const endTimeCondition =
      (details.hasEndTime &&
        details.endTime != null &&
        new Date(details.startTime) <= new Date(details.endTime)) ||
      !details.hasEndTime;
    setErrorMsg({
      name:
        details.name.length < 3 ? "must contains at least 3 characters" : null,
      description:
        details.description.length === 0 ? "please enter description" : null,
      startTime:
        details.startTime == null
          ? "please enter the start time of contest"
          : new Date(details.startTime) < new Date()
          ? "start time should be in future"
          : null,
      hasEndTime: true,
      endTime:
        details.hasEndTime && details.endTime == null
          ? "please enter the end time of contest"
          : new Date(details.startTime) > new Date(details.endTime)
          ? "end time should be after start time"
          : null,
    });

    if (
      details.description.length !== 0 &&
      details.name.length >= 3 &&
      details.startTime != null &&
      new Date(details.startTime) >= new Date() &&
      endTimeCondition
    ) {
      const contest = {
        ...details,
        endTime: details.hasEndTime ? details.endTime : null,
      };
      try {
        setLoading(true);
        if (operation === "create") {
          setErrorMsg({ ...errorMsg, endTime: null });
          const res = await axios.post("/contests", {
            ...contest,
            courseNumber: id,
          });
          navigate(
            `/administration/courses/${id}/contests/${res?.data?.message}/challenges`
          );
          setLoading(false);
        } else {
          setErrorMsg({ ...errorMsg, endTime: null });
          await axios.put(`/contests/${contestId}`, contest);
          navigate(
            `/administration/courses/${id}/contests/${contestId}/challenges`
          );
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toastError(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };
  return (
    <Container fluid className={classes.Container}>
      <Row className="mt-3 mb-3">
        <Col>
          <Text
            text={"Contest Details"}
            size={"26px"}
            wegiht="600"
            fontFamily={"OpenSans"}
          />
        </Col>
      </Row>
      <Row className="mb-3 mt-5">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Contest Name"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="text"
            name="name"
            onChange={handleChange}
            value={details.name}
            size={"sm"}
            disabled={loading}
            msg={errorMsg.name}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Start Time"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="datetime-local"
            onChange={(e) => handleChange(null, "startTime", e.target.value)}
            value={details.startTime}
            disabled={loading}
            size={"sm"}
            msg={errorMsg.startTime}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"End Time"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="datetime-local"
            onChange={(e) => handleChange(null, "endTime", e.target.value)}
            value={details.hasEndTime ? details.endTime : null}
            disabled={loading || !details.hasEndTime}
            size={"sm"}
            msg={errorMsg.endTime}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}></Col>
        <Col className={`${classes.ColInputFiled} ml-4`}>
          <CheckRank
            type={"checkbox"}
            label={`This contest has end time.`}
            name="hasEndTime"
            checked={details.hasEndTime}
            onChange={handleChange}
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
          <TextEditor
            name={"description"}
            text={details.description}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.description}
          />
        </Col>
      </Row>
      {loading && (
        <Row>
          <Col xs={"auto"} className={classes.Loaderspace}></Col>
          <Col className={classes.Loader}>
            <LoaderRank loading={loading} />
          </Col>
        </Row>
      )}
      <Row className="mt-5 mb-3">
        <Col Col xs={"auto"} className={classes.TitleFiled}></Col>
        <Col className={classes.ActionBtns}>
          <ButtonRank
            text={"Cancel Changes"}
            onClick={() =>
              navigate("/administration/courses/" + id + "/contests")
            }
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

export default ContestsDetalis;
