import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
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
                  to="/livBid"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Live Bids
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
              <NavDropdown title="Bids" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    to="/acceptedBids"
                    style={{ color: "wheat", textDecoration: "none" }}
                  >
                    Accepted Bids
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/ongoingBids"
                    style={{ color: "wheat", textDecoration: "none" }}
                  >
                    Ongoing Bids
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    to="/currentBids"
                    style={{ color: "wheat", textDecoration: "none" }}
                  >
                    Today's Bids
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Posts" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    to="/acceptedPost"
                    style={{ color: "wheat", textDecoration: "none" }}
                  >
                    Accepted Post
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/ongoingPost"
                    style={{ color: "wheat", textDecoration: "none" }}
                  >
                    Ongoing Post
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    to="/currentPost"
                    style={{ color: "wheat", textDecoration: "none" }}
                  >
                    Today's Post
                  </Link>
                </NavDropdown.Item>
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
