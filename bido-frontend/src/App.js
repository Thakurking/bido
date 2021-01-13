import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "./component/landingPage";
import Login from "./component/screens/login";
import Signup from "./component/screens/signup";
import Home from "./component/screens/navBarComponent/home";
import LiveBid from "./component/screens/navBarComponent/liveBid";
import AddPost from "./component/screens/navBarComponent/addPost";

import Protected from "./component/protectedRoutes/protectedRoutes";

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
        <Protected exact path="/home" component={Home} />
        <Protected exact path="/liveBid" component={LiveBid} />
        <Protected exact path="/addPost" component={AddPost} />
      </Router>
    </>
  );
}
