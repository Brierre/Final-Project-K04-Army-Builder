import React from 'react';
import UnitCardList from './UnitCardList';
import UnitCard from './UnitCard';

function ArmyDetails({ army, showAddButton }) {
    const { selectedFaction, selectedPoints, units } = army;

    return (
        <div>
            <h3>Selected Faction: {selectedFaction}</h3>
            <h3>Selected Points: {selectedPoints}</h3>
            {/* <UnitCardList unitCards={units} showAddButton={showAddButton} /> */}
            {units.map((unit) => (
                <UnitCard
                    key={unit.id}
                    name={unit.properties.title}
                    army={unit.properties.army}
                    imageSrc={unit.properties.image}
                    category={unit.properties.category}
                    canBeHero={unit.properties.canBeHero}
                    numModels={unit.properties.numModels}
                    points={unit.properties.points}
                    movement={unit.properties.movement}
                    toughness={unit.properties.toughness}
                    save={unit.properties.save}
                    wounds={unit.properties.wounds}
                    leadership={unit.properties.leadership}
                    abilityList={unit.properties.abilityList}
                    wargearOptions={unit.properties.wargearOptions}
                    defaultWeapon={unit.properties.defaultWeapon}
                    notes={unit.properties.notes}
                    additionalPoints={unit.properties.additionalPoints}
                    showAddButton={showAddButton}
                />
            ))}
        </div>
    );
}

export default ArmyDetails;


