import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar color="inherit">
          <Toolbar>
            <Typography
              variant="h3"
              style={{
                fontFamily: "monospace",
              }}
            >
              Bido
            </Typography>
          </Toolbar>
          <Toolbar
            style={{
              paddingBottom: 10,
            }}
          >
            <ButtonGroup>
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
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box my={10}>
          <Container>
            <h1>What is Bido</h1>
            <h2>
              Bido is an online bidding platform that gives services to
              freelancer and user to give a post and bid on four different
              services -
            </h2>
            <ol>
              <h2>Catering</h2>
              <h2>Shipping</h2>
              <h2>Interior Design</h2>
              <h2>Construction</h2>
            </ol>
            <h2>
              User can post on any of these above categories and freelancers
              can bid on there post.
            </h2>
            <h2>
              if user accepts there bids then they can contact each other.
            </h2>
            <h2>
              if you want to explore more then please signup:-
              <Button
                variant="contained"
                color="secondary"
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
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
}
