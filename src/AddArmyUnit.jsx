import React, { useEffect, useState } from "react";
import { getUserIdByUsername, getArmyList, createInitialUnit, addUnitToArmy } from "./rest/api";
import { Button } from "react-bootstrap";

const AddArmyUnit = ({ username, armyId, cardData, onAddUnit, showAddButton }) => {
    // console.log('army id before adding unit: ', armyId, username);
    const handleAddCardToArmy = async () => {
        console.log('army id before updatearmyhandler: ', armyId, username);
        try {
            if (!armyId) {
                console.log('Missing armyId');
                return;
            }
            const userId = await getUserIdByUsername(username);
            const armyData = await getArmyList(userId);
            const transformedCardData = {
                name: cardData.title,
                army: cardData.properties.army,
                canBeHero: cardData.properties.canBeHero,
                category: cardData.properties.category,
                defaultWeapon: cardData.properties.defaultWeapon,
                image: cardData.properties.image,
                leadership: cardData.properties.leadership,
                movement: cardData.properties.movement,
                numModels: cardData.properties.numModels,
                objectiveControl: cardData.properties.objectiveControl,
                points: cardData.properties.points,
                save: cardData.properties.save,
                toughness: cardData.properties.toughness,
                wounds: cardData.properties.wounds, 
            };
            console.log('transformers card data: ', transformedCardData);
            // console.log('armyData:', armyData);
            // console.log('armyData.units:', armyData.units);
            
            if (!armyData.units || armyData.units.length === 0) {
                // Create initial unit and get the unitId
                const initialUnit = await createInitialUnit(userId, armyId, transformedCardData);
                const unitId = initialUnit.id;
                // console.log('After initial Unit created card data: ', transformedCardData);

                onAddUnit(initialUnit);
                // console.log('army units data: ', armyData.units);
                // console.log('armyData:', armyData);
                // console.log('Unit added to army successfully!', initialUnit);
            } else {
                // Add subsequent unit to the army's units array
                const unitId = armyData.units[0].id; // Use the unitId from the first unit
                const updatedArmy = await addUnitToArmy(userId, armyId, unitId, transformedCardData);
                console.log('Unit added to army:', updatedArmy);
            }

            console.log('Unit added to army successfully!', cardData);
        } catch (error) {
            console.log('Error adding unit to army:', error);
        }
    };

    return (
        showAddButton && (
            <Button onClick={() => {
                // console.log('armyId before adding unit:', armyId, username);
                handleAddCardToArmy()
            }}>Add unit to my army</Button>
        )
    );
};
export default AddArmyUnit;