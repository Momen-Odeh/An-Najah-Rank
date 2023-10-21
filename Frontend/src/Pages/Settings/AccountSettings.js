import React, { useContext } from "react";
import { Alert, Col, Container, Modal, Row } from "react-bootstrap";
import Text from "../../Components/Text";
import Avatar from "react-avatar";
import ButtonRank from "../../Components/ButtonRank";
import useStyles from "./style";
import InputFiledRand from "../../Components/InputFiledRank";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import { useState } from "react";
import handelStateChanges from "../../Utils/handelStateChanges";
import SettingsContext from "../../Utils/SettingsContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePassword } from "../../Utils/Validation";
import { useNavigate } from "react-router-dom";
const AccountSettings = ({}) => {
  const clasess = useStyles();
  const navigate = useNavigate();
  const context = useContext(SettingsContext);
  const { accountInfo, setAccountInfo, loading, setLoading } = context;
  const [deleteModal, setDeleteModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    fullName: null,
    deleteAccount: null,
    deleteAccountPassword: "",
  });
  const [cookies, removeCookie] = useCookies();
  const handelSaveChanges = () => {
    setErrorMsg({
      ...errorMsg,
      fullName:
        accountInfo.fullName.length < 3
          ? "Full Name must contain at least 3 characters"
          : null,
    });
    setLoading(true);
    if (accountInfo.fullName.length >= 3) {
      if (accountInfo.UploadeImg) {
        const formData = new FormData();
        formData.append("image", accountInfo.UploadeImg);
        axios
          .put("http://127.0.0.1:5000/userImg?token=" + cookies.token, formData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.error, {
              position: "bottom-left",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
      if (accountInfo.UploadeImg === null) {
        axios
          .put("http://127.0.0.1:5000/user?token=" + cookies.token, {
            keys: ["fullName", "img"],
            values: [accountInfo.fullName, null],
          })
          .then((res) => {
            console.log(res);
            toast.success("updated successfully", {
              position: "bottom-left",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.error, {
              position: "bottom-left",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } else {
        axios
          .put("http://127.0.0.1:5000/user?token=" + cookies.token, {
            keys: ["fullName"],
            values: [accountInfo.fullName],
          })
          .then((res) => {
            console.log(res);
            toast.success("updated successfully", {
              position: "bottom-left",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.error, {
              position: "bottom-left",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    }

    setLoading(false);
  };
  const handelDeleteImg = () => {
    setAccountInfo({ ...accountInfo, img: null, UploadeImg: null });
  };
  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setAccountInfo({
      ...accountInfo,
      img: URL.createObjectURL(event.target.files[0]), // Set the img property to the base64 URL of the uploaded image
      UploadeImg: event.target.files[0],
    });
  };
  const handelUplodeImg = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleImageChange);
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };
  const handelDeleteAccount = () => {
    setLoading(true);
    setErrorMsg({
      ...errorMsg,
      deleteAccount: !validatePassword(errorMsg.deleteAccountPassword)
        ? "password must contain at least 6 characters"
        : null,
    });
    if (validatePassword(errorMsg.deleteAccountPassword)) {
      axios
        .delete(
          "http://127.0.0.1:5000/user?token=" +
            cookies.token +
            "&password=" +
            errorMsg.deleteAccountPassword
        )
        .then((response) => {
          console.log(response);
          removeCookie("token");
          navigate("/log-in");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 422)
            setErrorMsg({
              ...errorMsg,
              deleteAccount: error.response.data.message,
            });
        });
    }
    setLoading(false);
  };
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Text
            text={"General Info"}
            fontFamily="Open Sans"
            size="20px"
            wegiht="600"
            color="#191e35"
          />
        </Col>
      </Row>
      <Row className="g-4 mb-4">
        <Col xs={"auto"}>
          <Avatar
            round
            size="150px"
            color="#0e141e"
            src={accountInfo.img ? accountInfo.img : null}
            name={accountInfo.fullName}
          />
        </Col>
        <Col className={clasess.UserInfoImg}>
          {[
            { Icon: AiOutlineMail, value: accountInfo.email },
            { Icon: AiOutlineNumber, value: accountInfo.universityNumber },
            { Icon: MdOutlineWorkOutline, value: accountInfo.role },
          ].map((item, index) => (
            <div className={clasess.IconContainer} key={index}>
              <item.Icon size={"25px"} color={"#191e35"} />{" "}
              <Text
                text={item.value}
                color={"#191e35"}
                size={item.value == accountInfo.email && "14px"}
              />
            </div>
          ))}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className={clasess.AccountImgContainer}>
          <ButtonRank
            text={"Uplode image"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
            onClick={handelUplodeImg}
            disabled={loading}
          />
          <ButtonRank
            text={"Delete Image"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
            onClick={handelDeleteImg}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRand
            type={"text"}
            label={"Full Name"}
            id={"fullName"}
            value={accountInfo.fullName}
            name={"fullName"}
            onChange={(e) => handelStateChanges(e, accountInfo, setAccountInfo)}
            disabled={loading}
            msg={errorMsg.fullName}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Text
            text={"Delete Accounts"}
            fontFamily="Open Sans"
            size="18px"
            wegiht="500"
            color="#696c83"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Text
            text={
              "Delete your account and all information related to your account such as your profile page, badges earned and leaderboard positions. Please be aware that all data will be permanently lost if you delete your account."
            }
            fontFamily="Open Sans"
            size="18px"
            wegiht="500"
            color="#191e35"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <ButtonRank
            text={"Delete Account"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
            onClick={() => setDeleteModal(true)}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row className={clasess.SaveChanges}>
        <Col>
          {loading && <Loader size={50} color="#191e35" speedMultiplier={1} />}
        </Col>
        <Col>
          <ButtonRank
            text={"Save Changes"}
            hoverBackgroundColor="#0e141e"
            width={"150px"}
            onClick={handelSaveChanges}
            disabled={loading}
          />
        </Col>
      </Row>
      <ToastContainer />
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account? You won't be able to
            use your account information again.
          </p>
          <InputFiledRand
            type={"password"}
            label={"password"}
            id={"deleteAccountPassword"}
            value={errorMsg.deleteAccountPassword}
            name={"deleteAccountPassword"}
            msg={errorMsg.deleteAccount}
            onChange={(e) => handelStateChanges(e, errorMsg, setErrorMsg)}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonRank
            text={"Delete"}
            hoverBackgroundColor="#0e141e"
            onClick={handelDeleteAccount}
            disabled={loading}
          />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AccountSettings;