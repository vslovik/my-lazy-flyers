import React, {useState} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Flyer from './Flyer';
import Top from './Top';
import { GiHamburgerMenu } from 'react-icons/gi';

function App() {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleTop = (flag) => {
    setShow(flag)
  }

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
      <Top show={show} handleTop={handleTop}/>
    </Container>
  )
}

export default App;