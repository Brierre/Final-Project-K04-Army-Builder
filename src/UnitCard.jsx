import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Detachment = {
    INFANTRY: 1,
    MOUNTED: 2,
    VEHICLE: 3,
    FORTIFICATION: 4,
    ARTILLERY: 5,
    MONSTER: 6
}

function UnitCard({ 
    name,
    army,
    canBeHero,
    numModels,
    points,
    movement,
    toughness,
    save,
    wounds,
    leadership,
    objectiveControl,
    abilityList,
    wargearOptions,
    defaultWeapon,
    image,
    notes,
    additionalPoints,
}) {


    return (
        <Card className='card d-flex flex-column bg-secondary h-100 rounded border border-light' style={{ height: '20rem', width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body className='bg-dark text-light rounded border border m-1'>
                <Card.Title className='text-light fw-bold fs-6 mb-4'>{name}</Card.Title>
                <div className="card-font">
                    <Card.Text>Points Cost: {points} for {numModels} model(s)</Card.Text>
                    <Card.Text>Mvt: {movement} Tough: {toughness} Save: {save} Wound: {wounds}</Card.Text>
                    <Card.Text>Leadership: {leadership} OC: {objectiveControl}</Card.Text>
                    <Card.Text>Abilities: {abilityList}</Card.Text>
                    <Card.Text>Wargear Options: {wargearOptions}</Card.Text>
                    <Card.Text>Default Weapon: {defaultWeapon}</Card.Text>
                    <Card.Text>Notes: {notes}</Card.Text>
                    <Card.Text>Add'l Points: {additionalPoints}</Card.Text>
                </div>
            {/* replace with checkbox for Hero status */}
                <Card.Text>Warlord?: {canBeHero}</Card.Text> 
                
                <Button>Add to Army</Button>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{name}</ListGroup.Item>
                {/* Add more unit details here */}
            </ListGroup>
        </Card>
    );
}

export default UnitCard;
