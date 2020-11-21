import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import NavBar from "./NavBar";

export default function liveBid() {
  const postData = (cat) => {
    axios
      .get("/showAllPost", {
        headers: {
          jwt: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <NavBar />
      <Container fluid>
        <ButtonGroup size="xs" className="mt-3">
          <Button
            onClick={() => {
              postData(1);
            }}
          >
            Catering
          </Button>
          <Button
            onClick={() => {
              postData(2);
            }}
          >
            Shipping
          </Button>
          <Button
            onClick={() => {
              postData(3);
            }}
          >
            Interior Design
          </Button>
          <Button
            onClick={() => {
              postData(4);
            }}
          >
            Construction
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}
