import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useStyle from "./Style";
import Notification from "./Notification";
import Messages from "./Messages";
import UserChoices from "./UserChoices";
import { routeNames, routes } from "../../Utils/Utils";
import Logo from "./images/logo.jpg";
import { useContext } from "react";
import userContext from "../../Utils/userContext";
import Cookies from "js-cookie";
const Header = ({ activeTab }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const { activeUser } = useContext(userContext);
  const userChoicesData = [
    { id: 1, title: "Profile", link: "/profile" },
    { id: 2, title: "Settings", link: "/settings" },
    { id: 5, title: "Admin", link: "/admin" },
    { id: 3, title: "Administration", link: "/administration/courses" },
    { id: 4, title: "Logout", link: "/log-in" },
  ].filter((item) => {
    if (activeUser.role !== "student" && item.id === 3) {
      return item;
    } else if (activeUser.role === "admin" && item.id === 5) {
      return item;
    } else if (item.id !== 3 && item.id !== 5) {
      return item;
    }
  });
  const logOutSystem = () => {
    const cookieNames = Object.keys(Cookies.get());
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName, { path: "/" });
    });
    localStorage.clear();
    navigate("/log-in");
    window.location.reload();
  };
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
        <Navbar.Brand
          className={classes.logo}
          onClick={() => navigate("/profile")}
        >
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
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={classes.navCollapse}
        >
          <Nav className="me-auto">
            {/* {activeUser?.email && (
              <Nav.Link
                className={`${classes.hoveringColor} ${
                  activeTab === routeNames.HOME ? classes.activeTab : ""
                }`}
                onClick={() => navigate("/courses")}
              >
                Courses
              </Nav.Link>
            )}
            {!activeUser?.email && (
              <Nav.Link
                className={`${classes.hoveringColor} ${
                  activeTab === routeNames.LOG_IN ? classes.activeTab : ""
                }`}
                onClick={() => navigate(signInPath)}
              >
                Sign in
              </Nav.Link>
            )} */}
            {activeUser?.email && (
              <div className={classes.userChoicesSmall}>
                {userChoicesData.map((choice, index) => (
                  <Nav.Link
                    key={index}
                    className={`${classes.hoveringColor}`}
                    onClick={() => {
                      if (choice.id === 4) logOutSystem();
                      else navigate(choice.link);
                    }}
                  >
                    {choice.title}
                  </Nav.Link>
                ))}
              </div>
            )}
          </Nav>
          {/* <Nav className={classes.customInputGroup}>
            <SearchBox />
          </Nav> */}
        </Navbar.Collapse>
        {activeUser?.email && (
          <Nav style={{ order: "1" }} className={classes.userChoiceLarge}>
            <UserChoices userChoices={userChoicesData} />
          </Nav>
        )}
        {activeUser?.email && (
          <Nav className="ml-auto d-flex flex-row ">
            <Messages />
            <Notification />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;
