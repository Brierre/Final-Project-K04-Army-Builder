import React from 'react';
import UnitCard from './UnitCard';
import Navigation from './Navigation';

const MyArmyPage = ({ selectedUnits }) => {
    return (
        <>
        <Navigation />
            <h3>My Army</h3>
            {selectedUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
            ))}
        </>
    );
};

export default MyArmyPage;


