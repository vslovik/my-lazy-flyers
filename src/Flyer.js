import React from 'react';
import Card from 'react-bootstrap/Card';
import Heart from './Heart';

const Flyer = (props) => {
  return(
        <Card>
            <Card.Img variant="top" src="./grey_md.jpg" />
            <Card.Body>
                <Card.Text>{props.flyer.retailer.toUpperCase()}</Card.Text>
                <Card.Title>
                    {props.flyer.title} {props.flyer.id}
                </Card.Title>
                <Card.Subtitle>{props.flyer.category}</Card.Subtitle>
                <Heart active={props.isFavorite} flyer={props.flyer} handleHeart={props.handleHeart} />
            </Card.Body>
        </Card>      
    )
}

export default Flyer;