import React from 'react';
import UnitCard from './UnitCard';

function ArmyDetails({ army, unitCards, showAddButton }) {
    const { selectedFaction, selectedPoints } = army;

    return (
        <div>
            <h3>Selected Faction: {selectedFaction}</h3>
            <h3>Selected Points: {selectedPoints}</h3>
            {Array.isArray(unitCards) ? (
                unitCards.map((unit) => (
                    <UnitCard
                        key={unit.id}
                        name={unit.name}
                        army={unit.army}
                        imageSrc={unit.image}
                        category={unit.category}
                        canBeHero={unit.canBeHero}
                        numModels={unit.numModels}
                        points={unit.points}
                        movement={unit.movement}
                        toughness={unit.toughness}
                        save={unit.save}
                        wounds={unit.wounds}
                        leadership={unit.leadership}
                        objectiveControl={unit.objectiveControl}
                        // abilityList={unit.abilityList}
                        // wargearOptions={unit.wargearOptions}
                        defaultWeapon={unit.defaultWeapon}
                        // notes={unit.notes}
                        // additionalPoints={unit.additionalPoints}
                        showAddButton={showAddButton}
                    />
                ))
            ) : (
                <p>No units available</p>
            )}
        </div>
    );
}
export default ArmyDetails;


