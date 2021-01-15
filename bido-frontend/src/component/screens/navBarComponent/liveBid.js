import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

export default function liveBid() {
  const fetchData = () => {
    axios
      .get("/showAllPost", {
        headers: {
          "Content-Type": "application/json",
          user_id: localStorage.getItem("user_id"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <>
      {/* <NavBar /> */}
      <Button
        onClick={() => {
          fetchData();
        }}
      >
        Click
      </Button>
    </>
  );
}
