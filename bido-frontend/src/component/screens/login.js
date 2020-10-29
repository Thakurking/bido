import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios"

const Signup = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    axios
      .post("/login", {
        phone,
        password,
      })
      .then((res) => {
        if(res.data.Error){
          console.log(res.data.Error)
        }else{
          console.log(res.data.message);
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("User", res.data.User);
          history.push("/home");
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
                Login
              </Typography>
              <Grid>
                <form
                  autoComplete="on"
                  style={{ marginTop: 15, marginLeft: 75 }}
                >
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
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <h3>
                New user.
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Signup
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
