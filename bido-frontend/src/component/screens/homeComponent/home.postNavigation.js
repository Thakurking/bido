import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav, Spinner } from "react-bootstrap";
import "../../../App.css";

const PostNavigation = () => {
  const [message, setMessage] = useState("");
  const [catering, setCatering] = useState([""]);
  const [loadCatering, setLoadCatering] = useState(false);
  const [shipping, setShipping] = useState([""]);
  const [loadShipping, setLoadShopping] = useState(false);
  const [interiorDesign, setInteriorDesign] = useState([""]);
  const [loadInteriorDesign, setLoadInteriorDesign] = useState(false);
  const [construction, setConstruction] = useState([""]);
  const [loadConstruction, setLoadConstruction] = useState(false);

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
        console.log(res.data.catering);
        if (res.data.isSuccess) {
          setLoadCatering(true);
          setCatering(res.data.catering);
          setMessage(res.data.message);
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
        console.log(res.data);
        if (res.data.isSuccess) {
          setLoadShopping(true);
          setShipping(res.data.shipping);
          setMessage(res.data.message);
        }
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
        console.log(res.data);
        setLoadInteriorDesign(true);
        setInteriorDesign(res.data.interiorDesign);
        setMessage(res.data.message);
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
        console.log(res.data);
        setLoadConstruction(true);
        setConstruction(res.data.construction);
        setMessage(res.data.message);
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
        <h3>{message}</h3>
        {loadCatering ? (
          catering.map((caterings) => {
            return (
              <div>
                <h5>{caterings.postedBy}</h5>
                <h5>{caterings.catering.items}</h5>
              </div>
            );
          })
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {loadShipping ? (
          shipping.map((shippings) => {
            return (
              <div>
                <h5>{shippings.postedBy}</h5>
              </div>
            );
          })
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {loadInteriorDesign ? (
          interiorDesign.map((interiorDesigns) => (
            <div>{interiorDesigns.notes}</div>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {loadConstruction ? (
          construction.map((constructions) => (
            <div>{constructions.construction}</div>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </Container>
    </div>
  );
};

export default PostNavigation;
