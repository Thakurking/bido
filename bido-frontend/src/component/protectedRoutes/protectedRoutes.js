import React from "react";
import { Redirect, Route } from "react-router-dom";

const protectedRoutes = ({ component: Cmp, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user_id") ? (
        <Cmp {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default protectedRoutes;