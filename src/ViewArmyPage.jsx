import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UnitCard from './UnitCard';
import { getPlayerArmy } from './rest/api';

const ViewArmyPage = () => {
    const { armyId } = useParams();
    const [armyData, setArmyData] = useState(null);

    useEffect(() => {
        fetchArmyData();
    }, []);

    const fetchArmyData = async () => {
        try {
            // Fetch the army data using the armyId
            // Replace 'getPlayerArmyData' with the appropriate API function to fetch army data based on the armyId
            const armyData = await getPlayerArmy(armyId);
            setArmyData(armyData);
        } catch (error) {
            console.error('Error fetching army data:', error);
        }
    };

    if (!armyData) {
        return <p>Loading...</p>;
    }

    const { selectedFaction, selectedPoints, units } = armyData;

    return (
        <div>
            <h1>View Army</h1>
            <h3>Selected Faction: {selectedFaction}</h3>
            <h3>Selected Points: {selectedPoints}</h3>

            {units.map((unit) => (
                <UnitCard key={unit.id} {...unit} />
            ))}
        </div>
    );
};

export default ViewArmyPage;
