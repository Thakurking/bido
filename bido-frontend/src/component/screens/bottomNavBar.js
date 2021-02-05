import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const bottomNavBar = () => {
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
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
        <Nav.Link
          as={Link}
          to="/review"
          style={{ color: "wheat", textDecoration: "none" }}
        >
          Reviews
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/feedback"
          style={{ color: "wheat", textDecoration: "none" }}
        >
          Feedback
        </Nav.Link>
      </Navbar>
    </div>
  );
};

export default bottomNavBar;
