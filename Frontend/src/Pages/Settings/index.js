import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useStyles from "./style";
import Text from "../../Components/Text";
import { BsPerson } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";
import axios from "axios";
import SettingsContext from "../../Utils/SettingsContext";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../Utils/toast";
const Settings = () => {
  const navigate = useNavigate();
  const [accountInfo, setAccountInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const classes = useStyles();
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        const imageSrc =
          response.data.img && `data:image/jpeg;base64,${response.data.img}`;
        setAccountInfo({ ...response.data, img: imageSrc });
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        if (error.response.status === 401) {
          toastError("unauthorized access");
          navigate("/log-in");
        }
      });
  }, []);
  const [settingsContent, setSettingsContent] = useState({
    select: "Account",
    component: <AccountSettings />,
  });
  const handelSelectSettings = (name, Component) => {
    setSettingsContent({
      select: name,
      component: Component,
    });
  };
  return (
    <SettingsContext.Provider
      value={{
        accountInfo: accountInfo,
        setAccountInfo: setAccountInfo,
        loading: loading,
        setLoading: setLoading,
        updatePassword: updatePassword,
        setUpdatePassword: setUpdatePassword,
      }}
    >
      <Container fluid className={classes.Container}>
        <Row className={`mb-2`}>
          <Col className={classes.Col}>
            <Text
              text={"Account Settings"}
              fontFamily="Open Sans"
              size="30px"
              wegiht="600"
              color="#191e35"
            />
          </Col>
        </Row>
        <Row className={`mb-3`}>
          <Col className={classes.Col}>
            <Text
              text={"Change your profile and account settings"}
              fontFamily="Open Sans"
              size="16px"
              wegiht="600"
              color="#696c83"
            />
          </Col>
        </Row>
        <Row className={`${classes.Row} mb-2`}>
          <Col className={`${classes.Col} ${classes.ColSelect}`} xs={"auto"}>
            {[
              {
                name: "Account",
                Icon: BsPerson,
                Component: <AccountSettings />,
              },
              {
                name: "Password",
                Icon: FiLock,
                Component: <PasswordSettings />,
              },
            ].map((item, index) => (
              <div
                className={classes.IconContainer}
                name={item.name}
                onClick={() => {
                  handelSelectSettings(item.name, item.Component);
                }}
                key={index}
              >
                <item.Icon
                  size={"25px"}
                  color={
                    item.name === settingsContent.select ? "#191e35" : "#696c83"
                  }
                />{" "}
                <Text
                  text={item.name}
                  color={
                    item.name === settingsContent.select ? "#191e35" : "#696c83"
                  }
                />
              </div>
            ))}

            {/* <div className={classes.IconContainer}>
            <FiLock size={"25px"} color="#696c83" />{" "}
            <Text text={"Password"} color="#696c83" />
          </div> */}
          </Col>
          <Col className={classes.Col}>{settingsContent.component}</Col>
        </Row>
      </Container>
    </SettingsContext.Provider>
  );
};

export default Settings;
