import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import ListGroup from 'react-bootstrap/ListGroup';
import { AiFillHeart } from 'react-icons/ai';

const Top = (props) => {

  const handleClose = () => {
    props.handleTop(false);
  };

  return (
      <Modal show={props.show} onHide={handleClose} contentClassName="top-modal-content" dialogClassName="top-flyers">
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
  )
}

export default Top;