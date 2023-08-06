import React, { useEffect, useState } from "react";
import { getPlayerArmy, updatePlayerArmy } from "./rest/api";
import { Button } from "react-bootstrap";

const AddArmyUnit = ({ username, armyId, cardData }) => {
    const handleAddCardToArmy = async () => {
        try {
            await updatePlayerArmy(username, armyId, cardData);
            console.log('Unit added to army successfully!', cardData);
        } catch (error) {
            console.log('Error adding unit to army:', error);
        }
    }

    return (
        <Button onClick={handleAddCardToArmy}>Add unit to my army</Button>
    );
}
export default AddArmyUnit;