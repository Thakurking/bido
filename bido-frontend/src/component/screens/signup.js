import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

import OtpPage from "../screens/otpPage";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setPass] = useState("");
  const [active, setActive] = useState("");
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    width: "100vw",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const postData = () => {
    axios
      .post("/signup", {
        name,
        email,
        phone,
        password,
        cpassword,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess) {
          localStorage.setItem("userId", res.data.userId);
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
          setActive(true);
        }
        if (res.data.isOTP) {
          setActive(true);
          localStorage.setItem("userId", res.data.userId);
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
        }
        if (!res.data.isSuccess) {
          toast.fire({
            icon: "warning",
            title: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <Card className="text-center">
          <Card.Header style={{ backgroundColor: "#343a40" }}>
            <h2 style={{ color: "wheat" }}>Signup</h2>
          </Card.Header>
          <Card.Body>
            <Card.Title>Full Name</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Text>
            <Card.Title>Email</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Text>
            <Card.Title>Phone Number</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Text>
            <Card.Title>Password</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Text>
            <Card.Title>Confirm Password</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                postData();
              }}
            >
              Login
            </Button>
          </Card.Body>
          <Card.Footer style={{ backgroundColor: "#343a40", color: "wheat" }}>
            Already member.
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Card.Footer>
        </Card>
        {active ? <OtpPage /> : null}
      </Container>
    </>
  );
};

export default Signup;
