import React, {useState} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import ListGroup from 'react-bootstrap/ListGroup';
import Flyer from './Flyer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillHeart } from 'react-icons/ai';

function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <GiHamburgerMenu onClick={handleShow} /> Shopfully
        </Navbar.Brand>
      </Navbar>
      <Row>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
        <Col xs={6} sm={3}>
          <Flyer />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} contentClassName="top-modal-content" dialogClassName="top-flyers">
        <Modal.Header closeButton bsPrefix="top-modal-header">
        </Modal.Header>
        <Card bsPrefix="top-header">
            <Card.Body>
                <Figure>
                  <Figure.Image
                    src="grey_sm.jpg"
                  />
                </Figure>
                <Card.Title>
                  Favourites
                </Card.Title>
                <Card.Subtitle>The list of your preferred flyers</Card.Subtitle>
            </Card.Body>
        </Card> 
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item bsPrefix="top-list-group-item top-dark" active="true" variant="dark"><AiFillHeart /> Flyer Title</ListGroup.Item>
            <ListGroup.Item bsPrefix="top-list-group-item"><AiFillHeart /> Flyer Title</ListGroup.Item>
            <ListGroup.Item bsPrefix="top-list-group-item"><AiFillHeart /> Flyer Title</ListGroup.Item>
            <ListGroup.Item bsPrefix="top-list-group-item"><AiFillHeart /> Flyer Title</ListGroup.Item>
            <ListGroup.Item bsPrefix="top-list-group-item"><AiFillHeart /> Flyer Title</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer bsPrefix="top-modal-footer"></Modal.Footer>
      </Modal>

    </Container>
  )
}

export default App;