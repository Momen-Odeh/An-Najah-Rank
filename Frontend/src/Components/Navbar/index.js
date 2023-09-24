import { useState } from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'
import useStyle from "./Style"
import SearchBox from '../SearchBox'
import Notification from './Notification'
import Messages from './Messages'
import UserChoices from './UserChoices'
const Header = () =>{
  const classes = useStyle()
  const [userChoicesData, setUserChoicesData] = useState([
    { id: 1, title: 'Profile', link:'#Profile'},
    { id: 2, title: 'Settings', link:'#Settings'},
    { id: 3, title: 'Submissions', link:'#Submissions'},
    { id: 4, title: 'Administration', link:'#Administration'},
    { id: 5, title: 'Logout', link:'#Logout'},
  ]);
  return (
    <Navbar collapseOnSelect expand="lg" className={classes.navContainer}>
      <Container fluid >
        <Navbar.Brand href="/">        
          <img
            src='./images/logo.jpg'
            alt="Logo"
            width="60"
            height="40"
          />
          <span className={`m-1 ${classes.textColor}`}>An-Najah Rank</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={classes.burgerBtn}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#courses" className={`${classes.hoveringColor}`}>Courses</Nav.Link>
            <Nav.Link href="#sign-in" className={`${classes.hoveringColor}`}>Sign in</Nav.Link>
            <div className={classes.userChoicesSmall}>
              {
                userChoicesData.map((choice)=>
                  <Nav.Link key={choice.id} href={choice.link} className={`${classes.hoveringColor}`}>{choice.title}</Nav.Link>
                )
              }
            </div>
          </Nav>
          <Nav className={classes.customInputGroup}>
            <SearchBox/>
          </Nav>
        </Navbar.Collapse>
        <Nav style={{order:'1'}} className={classes.userChoiceLarge}>
            <UserChoices userChoices={userChoicesData}/>
        </Nav>
        <Nav className="ml-auto d-flex flex-row">
            <Messages/>
            <Notification/>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header