import React, { useState } from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
          localStorage.setItem("userId", res.data.user);
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
          setActive(true);
        }
        if (res.data.isOTP) {
          setActive(true)
          localStorage.getItem("userId", res.data.user);
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
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Card>
          <CardContent>
            <Grid container justify="center">
              <Typography
                variant="h3"
                style={{
                  fontFamily: "monospace",
                  marginTop: 25,
                  color: "blueviolet",
                }}
              >
                SignUp
              </Typography>
              <Grid>
                <form
                  autoComplete="on"
                  style={{ marginTop: 15, marginLeft: 75 }}
                >
                  <TextField
                    id="name"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "25ch",
                      height: "7ch",
                    }}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "25ch",
                      height: "7ch",
                    }}
                  />
                  <TextField
                    id="phone"
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "25ch",
                      height: "7ch",
                    }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "25ch",
                      height: "7ch",
                    }}
                  />
                  <TextField
                    id="cpassword"
                    label="Confirm Password"
                    value={cpassword}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    style={{
                      width: "25ch",
                      height: "7ch",
                    }}
                  />
                </form>
              </Grid>
              <Grid justify="center">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    postData();
                  }}
                  style={{
                    fontSize: 15,
                    marginTop: 7,
                  }}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <h3>
                Already registered.
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </h3>
            </Grid>
          </CardContent>
        </Card>
        {active === true && <OtpPage />}
      </Container>
    </React.Fragment>
  );
};

export default Signup;
