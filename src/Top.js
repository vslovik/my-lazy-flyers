import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import ListGroup from 'react-bootstrap/ListGroup';
import Heart from './Heart';

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
          {props.items.map((item) => (
            <ListGroup.Item key={item.id} bsPrefix="top-list-group-item">
              <Heart active={true} handleHeart={props.handleHeart} flyer={item} /> {item.title}
            </ListGroup.Item>
          ))}  
          </ListGroup>
        </Modal.Body>
        <Modal.Footer bsPrefix="top-modal-footer"></Modal.Footer>
      </Modal>
  )
}

export default Top;