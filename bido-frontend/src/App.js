import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import NavBar from "./component/navBar";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </div>
  );
}
