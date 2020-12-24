import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function postNavigation() {
  const fetchCatering = () => {};
  const fetchShipping = () => {};
  const fetchInteriorDesign = () => {};
  const fetchConstruction = () => {};
  return (
    <div>
      <Container fluid="md" style={{ marginTop: "50px" }}>
        <Row>
          <Col>
            <Nav variant="pills" defaultActiveKey="link-1">
              <Nav.Item>
                <Nav.Link
                  eventKey="link-1"
                  onClick={() => fetchCatering()}
                >
                  Catering
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => fetchShipping()}>
                  Shipping
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  onClick={() => fetchInteriorDesign()}
                >
                  Interior Design
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-4" onClick={() => fetchConstruction()}>
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
