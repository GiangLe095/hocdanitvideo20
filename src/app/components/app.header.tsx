"use client";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function AppHeader() {
  return (
    <Navbar bg="light" expand="lg" style={{ border: "none", boxShadow: "none", marginBottom: 0 }}>
      <Container>
        <Navbar.Brand href="#home" style={{ fontWeight: 500, fontSize: 28, letterSpacing: 0.5 }}>
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/2">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3">Something else</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 