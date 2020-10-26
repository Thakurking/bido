import React from 'react'
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const Signup = () =>{
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
                      id="email"
                      label="Email"
                      style={{
                        width: "25ch",
                        height: "7ch",
                      }}
                    />
                    <TextField
                      id="phone"
                      label="Phone"
                      style={{
                        width: "25ch",
                        height: "7ch",
                      }}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      style={{
                        width: "25ch",
                        height: "7ch",
                      }}
                    />
                    <TextField
                      id="cpassword"
                      label="Confirm Password"
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
                    onClick={() => alert("hello world")}
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
}

export default Signup;