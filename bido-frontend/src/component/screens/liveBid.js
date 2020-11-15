import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import NavBar from "./NavBar";

export default function liveBid() {
    return (
      <div>
        <NavBar />
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>Catering</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <InputGroup className="mb-3">
              <FormControl placeholder="Bid Amount" />
            </InputGroup>
            <Button>Bid</Button>
          </Card.Body>
        </Card>
      </div>
    );
}
