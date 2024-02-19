import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function NavDesign() {
  const navigate=useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loggedInStatus); // Convert to boolean
  }, []);

  const handleLogout = () => {
    // Clear the login status and data from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/Login');

  };
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      expanded={expanded}
      className="bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand href="/">Mission-Dhruva</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={toggleNavbar}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Add your navigation links here */}
            {/* <Nav.Link href="#">Home</Nav.Link> */}
          </Nav>
          <Nav className="justify-content-center">


            <Nav className="justify-content-center" >
              {/* Add your navigation links here */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/About">About</Nav.Link>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/Login">Login</Nav.Link>
              )}
            </Nav>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavDesign;
