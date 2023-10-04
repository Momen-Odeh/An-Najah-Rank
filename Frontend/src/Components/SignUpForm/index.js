import React, { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";
import InputFiledRegister from "../InputFiledRegister";
import { Col, Container, Form, Row } from "react-bootstrap";
import TextRegister from "../Text";
import ButtonRegister from "../ButtonRegister";
import useStyles from "./style";
import { Link, useNavigate } from "react-router-dom";
import handelStateChanges from "../../Utils/handelStateChanges";
import Text from "../Text";
import Swal from 'sweetalert2'
import Alert from "../Alert";
import Axios from 'axios';
const SignUpForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage,setAlertMessage] = useState('')
  const [variant, setVariant] = useState('warning')
  const [signupValue, setSignupValue] = useState({
    email: "",
    fullName: "",
    universityNumber: "",
    password: "",
    confirmPassword: "",
    isProfessor: false,
  });

  const handelSignUpButton = async(e) => {
    e.preventDefault();
    let thereError=false;
    try{
      setShowAlert(false)
      if(!signupValue.email){
        throw new Error("should enter your email")
      }else if(!signupValue.universityNumber){
        throw new Error("should enter your university number")
      }else if(!signupValue.fullName){
        throw new Error("should enter your full name")
      }else if(!signupValue.password){
        throw new Error("should enter your password")
      }else if(!signupValue.email){
        throw new Error("should enter your confirmation password")
      }else if(signupValue.password !== signupValue.confirmPassword){
        throw new Error("password not the same of confirm password")
      }else if(signupValue.isProfessor){
        if (signupValue.email.endsWith("@najah.edu"));
        else{
          throw new Error("You are not a professor")
        }
      }
    }catch(error){
      setAlertMessage(error.message)
      setVariant('warning')
      setShowAlert(true)
      thereError=true;
    }
    if(!thereError){
    try {
      console.log(signupValue)
      const data = {
        universityNumber: signupValue.universityNumber,
        email: signupValue.email,
        fullName: signupValue.fullName,
        password: signupValue.password,
        role: signupValue.isProfessor ? "professor" : "student",
      };
      console.log(data);
      const response = await Axios.post('http://localhost:5000/register', data);
      navigate("/verification-code")
    } catch (error) {
      setAlertMessage(error.response.data.message)
      setVariant('danger')
      setShowAlert(true)
    }
  }
    
  };
  return (
    <Container className={`${classes.Container} `} fluid={true}>
      <Row className="mb-3">
        <Col>
          <TextRegister
            text={"Sign Up"}
            color="#000000"
            height="45px"
            size="30px"
            wegiht="500"
          />
        </Col>
      </Row>
      <Row className="mb-0">
        <Col>
          <TextRegister
            text={"If you already have an account register"}
            color="#000000"
            height="24px"
            size="16px"
            wegiht="400"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <TextRegister
            text={"You can "}
            color="#000000"
            height="24px"
            size="16px"
            wegiht="400"
          />
          <Link to={"/log-in"} className={classes.Link}>
            <TextRegister
              text={"Login here !"}
              color="#0C21C1"
              height="24px"
              size="16px"
              wegiht="400"
            />
          </Link>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="Email"
            Icon={TfiEmail}
            placeHolder="Enter your email address"
            type="email"
            name={"email"}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="Full Name"
            Icon={FiUser}
            placeHolder="Enter your Full Name"
            type="text"
            name={"fullName"}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="University Number"
            Icon={AiOutlineNumber}
            placeHolder="Enter your University Number"
            type="text"
            name={"universityNumber"}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputFiledRegister
            label="Password"
            Icon={TfiLock}
            placeHolder="Enter your Password"
            type="password"
            name={"password"}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <InputFiledRegister
            label="Confirm Password"
            Icon={TfiLock}
            placeHolder="Confirm your Password"
            type="password"
            name={"confirmPassword"}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
          />
        </Col>
      </Row>
      <Row className="mb-5 ms-2">
        <Col>
        <Form.Group controlId="isProfessor">
          <Form.Check
            type="checkbox"
            size={'lg'}
            name="isProfessor"
            checked={signupValue.isProfessor}
            onChange={(e) => handelStateChanges(e, signupValue, setSignupValue)}
          />
          <Form.Label className={classes.labelForm}> <Text text={'Sign up as professor'} color='#595c5f'/></Form.Label>
           </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
        {showAlert&&
        <Alert
          message={alertMessage} variant={variant}/>}
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonRegister
            text="Register"
            onClick={handelSignUpButton}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
