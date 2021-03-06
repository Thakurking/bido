import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
    const history = useHistory();
  const [otp, setOtp] = useState("");
  const postData = () => {
    axios
      .post("/verifyOTP", {
        otp,
        userId: localStorage.getItem("userId"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess) {
          history.push("/home");
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
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
                OTP
              </Typography>
            </Grid>
            <Grid>
              <form
                autoComplete="off"
                style={{ marginTop: 15, marginLeft: 75 }}
              >
                <TextField
                  id="otp"
                  label="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                Verify
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Signup;
