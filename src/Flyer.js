import React from 'react';
import Card from 'react-bootstrap/Card';
import Heart from './Heart';

const Flyer = () => {
  return(
        <Card>
            <Card.Img variant="top" src="./grey_md.jpg" />
            <Card.Body>
                <Card.Text>RETAILER NAME</Card.Text>
                <Card.Title>
                    Flier Title
                </Card.Title>
                <Card.Subtitle>Category Name</Card.Subtitle>
                <Heart />
            </Card.Body>
        </Card>      
    )
}

export default Flyer;