import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function postNavigation() {
  const fetchCatering = (cat) => {
    console.log(cat);
    useEffect(() => {
      axios
        .get("/showAllPost", {
          headers: {
            "Content-Type": "application/json",
            user_id: localStorage.getItem("user_id"),
          },
          params: {
            cat: cat,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };
  const fetchShipping = (cat) => {
    console.log(cat);
    useEffect(() => {
      axios
        .get("/showAllPost", {
          headers: {
            "Content-Type": "application/json",
            user_id: localStorage.getItem("user_id"),
          },
          params: {
            cat: cat,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };
  const fetchInteriorDesign = (cat) => {
    useEffect(() => {
      axios
        .get("/showAllPost", {
          headers: {
            "Content-Type": "application/json",
            user_id: localStorage.getItem("user_id"),
          },
          params: {
            cat: cat,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };
  const fetchConstruction = (cat) => {
    useEffect(() => {
      axios
        .get("/showAllPost", {
          headers: {
            "Content-Type": "application/json",
            user_id: localStorage.getItem("user_id"),
          },
          params: {
            cat: cat,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };
  return (
    <div>
      <Container fluid="md" style={{ marginTop: "50px" }}>
        <Row>
          <Col>
            <Nav variant="pills" defaultActiveKey="link-1">
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => fetchCatering(1)}>
                  Catering
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => fetchShipping(2)}>
                  Shipping
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  onClick={() => fetchInteriorDesign(3)}
                >
                  Interior Design
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-4"
                  onClick={() => fetchConstruction(4)}
                >
                  Construction
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
