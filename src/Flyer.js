import React from 'react';
import Card from 'react-bootstrap/Card';
import Heart from './Heart';

const Flyer = (props) => {
  return(
        <Card>
            <Card.Img variant="top" src="./grey_md.jpg" />
            <Card.Body>
                <Card.Text>{props.retailer.toUpperCase()}</Card.Text>
                <Card.Title>
                    {props.title}
                </Card.Title>
                <Card.Subtitle>{props.category}</Card.Subtitle>
                <Heart />
            </Card.Body>
        </Card>      
    )
}

export default Flyer;