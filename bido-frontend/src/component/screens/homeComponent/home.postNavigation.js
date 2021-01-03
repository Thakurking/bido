import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../../../App.css";

const PostNavigation = () => {
  const [loading, setLoading] = useState(false);
  const [catering, setCatering] = useState([]);
  const FetchCatering = (cat) => {
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
        if(res.data.isSuccess){
          setLoading(true)
          setCatering(res.data.catering);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FetchShipping = (cat) => {
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
  };
  const FetchInteriorDesign = (cat) => {
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
  };
  const FetchConstruction = (cat) => {
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
  };
  return (
    <div>
      <Container fluid="md" className="justify-center border homeContainer">
        <Row>
          <Col>
            <Nav>
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => FetchCatering(1)}>
                  Catering
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => FetchShipping(2)}>
                  Shipping
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  onClick={() => FetchInteriorDesign(3)}
                >
                  Interior Design
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-4"
                  onClick={() => FetchConstruction(4)}
                >
                  Construction
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
      <Container fluid="sm" className="justify-center border">

      </Container>
    </div>
  );
};

export default PostNavigation;
