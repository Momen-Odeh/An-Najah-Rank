import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useStyle from "./Style";
import SearchBox from "../SearchBox";
import Notification from "./Notification";
import Messages from "./Messages";
import UserChoices from "./UserChoices";
import { routeNames, routes } from "../../Utils/Utils";
import Logo from "./images/logo.jpg";
const Header = ({ activeTab }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const userChoicesData = [
    { id: 1, title: "Profile", link: "/profile" },
    { id: 2, title: "Settings", link: "/settings" },
    { id: 3, title: "Submissions", link: "#Submissions" },
    { id: 4, title: "Administration", link: "/administration/courses" },
    { id: 5, title: "Logout", link: "log-in" },
  ];
  const signInPath = routes.filter(
    (item) => item.title === routeNames.LOG_IN
  )[0].path;
  const homePath = routes.filter((item) => item.title === routeNames.HOME)[0]
    .path;

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${classes.navContainer} p-2`}
    >
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" width="60" height="40" />
          <span
            className={`m-1 ${classes.textColor}`}
            style={{ userSelect: "none" }}
          >
            An-Najah Rank
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={classes.burgerBtn}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className={`${classes.hoveringColor} ${
                activeTab === routeNames.HOME ? classes.activeTab : ""
              }`}
              onClick={() => navigate("/courses")}
            >
              Courses
            </Nav.Link>
            <Nav.Link
              className={`${classes.hoveringColor} ${
                activeTab === routeNames.LOG_IN ? classes.activeTab : ""
              }`}
              onClick={() => navigate(signInPath)}
            >
              Sign in
            </Nav.Link>
            <div className={classes.userChoicesSmall}>
              {userChoicesData.map((choice, index) => (
                <Nav.Link
                  key={index}
                  className={`${classes.hoveringColor}`}
                  onClick={() => {
                    console.log("choice.id == 5");
                    navigate(choice.link);
                  }}
                >
                  {choice.title}
                </Nav.Link>
              ))}
            </div>
          </Nav>
          {/* <Nav className={classes.customInputGroup}>
            <SearchBox />
          </Nav> */}
        </Navbar.Collapse>
        <Nav style={{ order: "1" }} className={classes.userChoiceLarge}>
          <UserChoices userChoices={userChoicesData} />
        </Nav>
        <Nav className="ml-auto d-flex flex-row">
          {/* <Messages /> */}
          <Notification />
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
