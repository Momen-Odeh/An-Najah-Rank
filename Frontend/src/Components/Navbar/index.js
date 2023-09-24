import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { InputGroup, FormControl } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import Style from "./Style"
import Notification from './Notification';
import Messages from './Messages';
import UserChoices from './UserChoices';
function index() {
  const classes = Style()
  return (
    <Navbar collapseOnSelect expand="lg" className={classes.navContainer}>
      <Container fluid className='px-lg-4 pe-xl-4'>
        <Navbar.Brand href="/">        
          <img
            src='./images/logo.jpg'
            alt="Logo"
            width="60"
            height="40"
          />
          <span className={`m-3 ${classes.textColor}`}>An-Najah Rank</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={classes.burgerBtn} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#courses" className={`${classes.hoveringColor}`}>Courses</Nav.Link>
            <Nav.Link href="#pricing" className={`${classes.hoveringColor}`}>Pricing</Nav.Link>
          </Nav>
          <InputGroup className={classes.customInputGroup}>
            <InputGroup.Text id="basic-addon2" className={classes.search}>
                <AiOutlineSearch />
              </InputGroup.Text>
            <FormControl
              className={classes.search}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <Nav >
            <Messages/>
            <Notification/>
          </Nav>
          <Nav>
          <UserChoices />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default index