import React from 'react';
import UnitCard from './UnitCard';
import unitsData from './units.json';

const UnitCardList = () => {
    return (
        <>
            {unitsData.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
            ))}
        </>
    );
};

export default UnitCardList;