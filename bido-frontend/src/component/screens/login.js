import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Card, Button, Form } from "react-bootstrap";

const Signup = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
      .post("/login", {
        phone,
        password,
      })
      .then((res) => {
        if (res.data.isSuccess) {
          localStorage.setItem("User", JSON.stringify(res.data.User));
          localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
          history.push("/home");
        } else {
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
            <h2 style={{ color: "wheat" }}>Login</h2>
          </Card.Header>
          <Card.Body>
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
            New User.
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default Signup;
