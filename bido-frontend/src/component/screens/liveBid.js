import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

export default function liveBid() {
  const fetchData = () => {
    axios
      .get("/showAllPost", {
        headers: {
          user_id: localStorage.getItem("user_id"),
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
      {/* <NavBar /> */}
      <Container>
        <Button
          onClick={() => {
            fetchData();
          }}
        >
          click me!
        </Button>
      </Container>
    </>
  );
}
