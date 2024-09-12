import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AppMenu from '../app-menu/AppMenu';
import './style.scss'


function NavigationMenu() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas 
      backdropClassName='navigation-menu'
        show={show} 
        onHide={handleClose}
        >
        <Offcanvas.Header
         closeButton
         className='navigation-menu'
         >
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='navigation-menu'>
          <AppMenu/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationMenu;
