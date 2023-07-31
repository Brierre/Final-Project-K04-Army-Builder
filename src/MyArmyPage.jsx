import React from 'react';
import UnitCard from './UnitCard';

const MyArmyPage = ({ selectedUnits }) => {
    return (
        <>
            <h3>My Army</h3>
            {selectedUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
            ))}
        </>
    );
};

export default MyArmyPage;


