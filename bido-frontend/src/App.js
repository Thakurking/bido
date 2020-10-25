import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "./component/landingPage";
import Login from "./component/screens/login";
import Signup from "./component/screens/signup";

export default function App() {
  return (
    <>
      <Router>
        <Route exact path="/landingPage">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Router>
    </>
  );
}
