import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationMenu from '../navigation-menu/NavigationMenu'
import './style.scss'


const AppNavbars = (props) => {

    return (
        <div
            className='app-navbars-container'
        >
        <Navbar expand="lg" className="app-navbars">
      <Container>
        <NavigationMenu/>
        <Navbar.Brand href="#home">GoojyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
        </div>
    )
}

export default AppNavbars
