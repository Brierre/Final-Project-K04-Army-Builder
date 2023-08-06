import React, { useEffect, useState } from "react";
import { getPlayerArmy, updatePlayerArmy } from "./rest/api";
import { Button } from "react-bootstrap";

const AddArmyUnit = ({ username, armyId, cardData, onAddUnit }) => {
    const handleAddCardToArmy = async () => {
        try {
            await updatePlayerArmy(username, armyId, cardData);
            console.log('Unit added to army successfully!', cardData);
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