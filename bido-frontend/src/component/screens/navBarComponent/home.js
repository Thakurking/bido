import React from "react";
import NavBar from "../NavBar";
import NavBarBottom from "../bottomNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import PostBar from "../homeComponent/home.postNavigation";

export default function home() {
  return (
    <div>
      <NavBar />
      <PostBar />
      <NavBarBottom />
    </div>
  );
}
