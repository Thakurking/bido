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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setPass] = useState("");
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
        if(res.data.Error){
          console.log(res.data.Error);
        }else{
          console.log(res.data.message);
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
                  onClick={() => postData()}
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
      </Container>
    </React.Fragment>
  );
};

export default Signup;