import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
const UserNav = () => {
  const handleNotificaion = () => {

  }
  
  return (

    <Navbar expand="lg" className="bg-body-tertiary border rounded-bottom rounded-3">
      <div className="container-fluid p-1 px-3">
        <Navbar.Brand href="#home">DocFly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">

          <Nav className="me-auto w-100">

            <Nav.Item >
              <Link className="nav-link"to="/" onClick={handleNotificaion}><i className="fa-solid fa-bars " aria-hidden="true"></i><span className="d-inline px-2 ">Dashbord</span></Link>
            </Nav.Item>
            <Nav.Item>
              
              <Link className="nav-link" to="/document" onClick={handleNotificaion}><span className="d-inline px-2 ">Document</span></Link>
            </Nav.Item>

            {/* <Nav.Item className="d-flex justify-self-end">
              <Nav.Link className="" href="/" onClick={handleNotificaion}><i className="fa fa-logout"></i><span className="d-inline px-2 ">Logout</span></Nav.Link>
            </Nav.Item> */}



          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>

  )
}
export default UserNav