import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from '@material-ui/icons/GitHub';

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="fixed"
        style={{
          padding: 7,
        }}
      >
        <Toolbar>
          <Typography
            variant="h2"
            style={{
              fontFamily: "monospace",
            }}
          >
            Bido
          </Typography>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{
                fontSize: 20,
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                Login
              </Link>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <h1>What is Bido</h1>
        <h2>
          Bido is an online bidding platform that gives services to freelancer
          and user to post a request on four different services then if any
          freelancer wanted to fulfil the requirement the the freelancer can bid
          on that post. We are free so feel free to use.
        </h2>
        <h2>
          Services That We Offer Now.
        </h2>
        <ul>
          <h2>Catering</h2>
          <h2>Shipping</h2>
          <h2>Interior Design</h2>
          <h2>Construction</h2>
        </ul>
        <h2>
          User can post on any of these above categories and freelancers can bid
          on there post.
        </h2>
        <h2>if user accepts there bids then they can contact each other.</h2>
        <h2>if you want to explore more then please signup</h2>
        <h2>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{
              fontSize: 20,
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signup"
            >
              Signup
            </Link>
          </Button>
        </h2>
        <h1>About</h1>
        <h2>
          This application is developed and maintained by Bharat Software
          Systems
        </h2>
        <h2>
          If you wanted to contribute to our project or create pull request you
          are welcome..
        </h2>
        <h2>
          Click here to contribute..
          <Button
            size="large"
            href="https://github.com/Thakurking/bido/tree/master"
          >
            <GitHubIcon />
          </Button>
        </h2>
      </Container>
    </React.Fragment>
  );
}
