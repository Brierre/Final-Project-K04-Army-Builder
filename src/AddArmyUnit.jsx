import React, { useEffect, useState } from "react";
import { getPlayerArmy, updatePlayerArmy } from "./rest/api";
import { Button } from "react-bootstrap";

const AddArmyUnit = ({ username, armyId, cardData }) => {
    const handleAddCardToArmy = async () => {
        try {
            const userArmyData = await getPlayerArmy(username, armyId);
            console.log(`Username:  ${username}  ArmyId:  ${armyId}  Data: ${userArmyData}`);
            if (!userArmyData || !Array.isArray(userArmyData.units)) {
                console.log(`Invalid army data or units not found for user: ${username}`);
                return;
            }

            const updatedUnits = [...userArmyData.units, cardData];
            const updatedArmyData = { ...userArmyData, units: updatedUnits };

            await updatePlayerArmy(username, armyId, updatedArmyData);
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