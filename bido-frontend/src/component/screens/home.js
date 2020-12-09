import React from 'react'
import NavBar from "./NavBar";
import NavBarBottom from "./bottomNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ButtonGroup, Button, Row, Col } from "react-bootstrap";

export default function home() {
  return (
    <div>
      <NavBar />
      <NavBarBottom />
    </div>
  );
}
