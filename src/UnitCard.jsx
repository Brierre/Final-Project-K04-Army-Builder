import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardModal from "./CardModal";
import AddArmyUnit from "./AddArmyUnit";

function UnitCard({
    name,
    army,
    category,
    canBeHero,
    numModels,
    points,
    movement,
    toughness,
    save,
    wounds,
    leadership,
    objectiveControl,
    defaultWeapon,
    image,
    selectedPoints,
    username,
    armyId,
    id,
    showAddButton = true,
    unitsData,
    onAddUnit,
    armyListId,
    // abilityList,
    // wargearOptions,                
    // notes,
    // additionalPoints,
}) {

    const [modalShow, setModalShow] = useState(false);

    const cardData = {
        title: name,
        properties: {
            army,
            canBeHero,
            category,
            numModels,
            points,
            movement,
            toughness,
            save,
            wounds,
            leadership,
            objectiveControl,
            defaultWeapon,
            image,
            // abilityList,
            // wargearOptions,                
            // notes,
            // additionalPoints,
        },
    };
    // console.log('username:', username);
    // console.log('armyId:', armyId);
    // console.log('cardData:', cardData);

    return (
        <div className="row">
            <div className="col-sm-6">
                <Card className='card d-flex flex-column bg-secondary h-100 rounded border border-light' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body className='bg-dark text-light rounded border border m-1'>
                        <Card.Title className='text-light fw-bold fs-6 mb-4'>{name}</Card.Title>
                        <div className="card-font">
                            <Card.Text>Points Cost: {points} for {numModels} model(s)</Card.Text>
                            <Card.Text>Mvt: {movement} Tough: {toughness} Save: {save} Wound: {wounds}</Card.Text>
                            <Card.Text>Leadership: {leadership} OC: {objectiveControl}</Card.Text>
                            {/* <Card.Text>Abilities: {abilityList}</Card.Text>
                            <Card.Text>Wargear Options: {wargearOptions}</Card.Text> */}
                            <Card.Text>Default Weapon: {defaultWeapon}</Card.Text>
                            {/* <Card.Text>Notes: {notes}</Card.Text>
                            <Card.Text>Add'l Points: {additionalPoints}</Card.Text> */}
                        </div>
                        {/* replace with checkbox for Hero status */}
                        <Card.Text>Warlord?: {canBeHero}</Card.Text>
                        {!showAddButton && (
                    <Button variant="danger" onClick={() => onDeleteUnit(unit.id)}>
                        Delete Unit from Army
                    </Button>)}
                        {showAddButton && (
                        <AddArmyUnit username={username} armyId={armyId} cardData={cardData} selectedPoints={selectedPoints} onAddUnit={onAddUnit} showAddButton={showAddButton} />
                        )}
                    </Card.Body>
                    <Button onClick={() => setModalShow(true)}>View Details</Button>
                </Card>
            </div>
            <CardModal
                cardData={cardData}
                show={modalShow}
                onClose={() => setModalShow(false)}
            />

        </div>
    );
}

export default UnitCard;
