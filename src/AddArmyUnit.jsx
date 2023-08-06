import React, { useEffect, useState } from "react";
import { updatePlayerArmy } from "./rest/api";
import { Button } from "react-bootstrap";

const AddArmyUnit = ({ username, armyId, cardData, onAddUnit }) => {
    const handleAddCardToArmy = async () => {
        try {
            const clonedCardData = { ...cardData };
            await updatePlayerArmy(username, armyId, { units: [clonedCardData] });
            console.log('Unit added to army successfully!', clonedCardData);
            onAddUnit();
        } catch (error) {
            console.log('card data: ', cardData);
            console.log('Error adding unit to army:', error);
        }
    }

    return (
        <Button onClick={() => {
            console.log('armyId before adding unit:', armyId);
            handleAddCardToArmy()}}>Add unit to my army</Button>
    );
}
export default AddArmyUnit;