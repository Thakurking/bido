import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "./component/landingPage";
import Login from "./component/screens/login";
import Signup from "./component/screens/signup";
import Home from "./component/screens/home";
export default function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Router>
    </>
  );
}
