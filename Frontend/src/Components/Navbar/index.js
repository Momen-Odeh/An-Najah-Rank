import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { InputGroup, FormControl,NavDropdown, Badge } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa'; 
import { AiOutlineSearch } from 'react-icons/ai';
import Style from "./Style"
import Notification from './Notification';
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
            <Nav.Link href="#features" className={classes.textColor}>Features</Nav.Link>
            <Nav.Link href="#pricing" className={classes.textColor}>Pricing</Nav.Link>
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
          <Nav>
            <Notification/>
          </Nav>
          <Nav>
            <Nav.Link href="#deets" className={classes.textColor}>More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className={classes.textColor}>
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default index