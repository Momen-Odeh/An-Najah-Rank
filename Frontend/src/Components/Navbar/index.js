import { useState } from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'
import useStyle from "./Style"
import SearchBox from '../SearchBox'
import Notification from './Notification'
import Messages from './Messages'
import UserChoices from './UserChoices'
import { routeNames, routes } from '../../Utils/Utils'
const Header = ( { activeTab }) =>{
  const classes = useStyle()
  const [userChoicesData, setUserChoicesData] = useState([
    { id: 1, title: 'Profile', link:'#Profile'},
    { id: 2, title: 'Settings', link:'#Settings'},
    { id: 3, title: 'Submissions', link:'#Submissions'},
    { id: 4, title: 'Administration', link:'#Administration'},
    { id: 5, title: 'Logout', link:'#Logout'},
  ]);
  const signInPath = routes.filter((item)=>item.title===routeNames.LOG_IN)[0].path
  const homePath = routes.filter((item)=>item.title===routeNames.HOME)[0].path
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
            <Nav.Link href={homePath} className={`${classes.hoveringColor} ${activeTab===routeNames.HOME?classes.activeTab:''}`}  onClick={(e)=>e.preventDefault}>Courses</Nav.Link>
            <Nav.Link href={signInPath} className={`${classes.hoveringColor} ${activeTab===routeNames.LOG_IN?classes.activeTab:''}`} onClick={(e)=>e.preventDefault}>Sign in</Nav.Link>
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