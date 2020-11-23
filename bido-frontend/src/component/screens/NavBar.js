import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, ButtonGroup, Button } from "react-bootstrap";
import GitHubIcon from '@material-ui/icons/GitHub';

export default function NavBar() {
  return (
    <div>
      <Container>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand>BIDO</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link
                  to="/Profile"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Profile
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/signup"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Live Bids
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/signup"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  About
                </Link>
              </Nav.Link>
              <NavDropdown title="Bids" id="collasible-nav-dropdown">
                <NavDropdown.Item>Accepted Bids</NavDropdown.Item>
                <NavDropdown.Item>Ongoing Bids</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Today's Bids</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Posts" id="collasible-nav-dropdown">
                <NavDropdown.Item>Accepted Post</NavDropdown.Item>
                <NavDropdown.Item>Ongoing Post</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Today's Post</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="https://github.com/Thakurking/bido">
                <GitHubIcon />
              </Nav.Link>
            </Nav>
            <Nav>
              <ButtonGroup className="ml-2">
                <Button
                  size="sm"
                  style={{
                    backgroundColor: "wheat",
                    border: "none",
                    color: "black",
                  }}
                >
                  Logout
                </Button>
              </ButtonGroup>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
