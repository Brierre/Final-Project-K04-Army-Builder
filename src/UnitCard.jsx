import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Detachment = {
    INFANTRY: 1,
    MOUNTED: 2,
    VEHICLE: 3,
    FORTIFICATION: 4,
    ARTILLERY: 5,
    MONSTER: 6
}

function UnitCard({ unit }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={unit.imageSrc} />
            <Card.Body>
                <Card.Title>{unit.name}</Card.Title>
                <Card.Text>{unit.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{unit.stats}</ListGroup.Item>
                {/* Add more unit details here */}
            </ListGroup>
        </Card>
    );
}

export default UnitCard;
