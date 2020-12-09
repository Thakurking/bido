import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
import Swal from "sweetalert2";
import axios from "axios"

export default function NavBar() {
  const history = useHistory();

  const toast = Swal.mixin({
    toast: true,
    position: "center",
    width: "100vw",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const logout = () => {
    axios
      .post("/deleteRedisAuth", {
        user_id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        if (res.data.isSuccess) {
          localStorage.removeItem("user_id");
          history.push("/login");
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
        } else {
          toast.fire({
            icon: "error",
            title: res.data.message,
          });
        }
      });
  };
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
                  to="/home"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Home
                </Link>
              </Nav.Link>
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
                  to="/liveBid"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Live Bids
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/addBids"
                  style={{ color: "wheat", textDecoration: "none" }}
                >
                  Add Bids
                </Link>
              </Nav.Link>
              <NavDropdown title="Bids" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    to="/acceptedBids"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Accepted Bids
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/ongoingBids"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Ongoing Bids
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    to="/currentBids"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Today's Bids
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Posts" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    to="/acceptedPost"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Accepted Post
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/ongoingPost"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Ongoing Post
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    to="/currentPost"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Today's Post
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Nav>
              <Nav.Link href="https://github.com/Thakurking/bido">
                <GitHubIcon />
              </Nav.Link>
            </Nav> */}
            <Nav>
              <ButtonGroup className="ml-2">
                <Button
                  size="sm"
                  style={{
                    backgroundColor: "wheat",
                    border: "none",
                    color: "black",
                  }}
                  onClick={() => logout()}
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
