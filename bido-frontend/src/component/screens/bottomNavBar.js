import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
export default function bottomNavBar() {
  return (
    <div>
      <Container>
        <Navbar expand="lg" bg="dark" variant="dark" fixed="bottom">
          <Nav.Link>
            <Link
              to="/contact"
              style={{ color: "wheat", textDecoration: "none" }}
            >
              Contact
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/about"
              style={{ color: "wheat", textDecoration: "none" }}
            >
              About
            </Link>
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link
                  to="/feedback"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Feedback
                </Link>
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
