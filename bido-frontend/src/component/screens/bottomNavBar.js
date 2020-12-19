import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
export default function bottomNavBar() {
  return (
    <div>
      <Container>
        <Navbar expand="lg" bg="dark" variant="dark" fixed="bottom">
          <Nav.Link
            as={Link}
            to="/contact"
            style={{ color: "wheat", textDecoration: "none" }}
          >
            Contact Us
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/about"
            style={{ color: "wheat", textDecoration: "none" }}
          >
            About Us
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                as={Link}
                to="/feedback"
                style={{ color: "wheat", textDecoration: "none" }}
              >
                Feedback
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://github.com/Thakurking/bido">
                <GitHubIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
