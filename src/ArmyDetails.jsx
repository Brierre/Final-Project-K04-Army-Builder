import React, { useState, useEffect } from 'react';
import UnitCard from './UnitCard';

function ArmyDetails({ army, unitCards, showAddButton, username, selectedArmy, selectedUnits, onDeleteUnit, setSelectedUnits }) {
    console.log("Unit Cards Length:", unitCards.length, unitCards);
    const [refreshCount, setRefreshCount] = useState(0);
    const { selectedFaction, selectedPoints } = army;

    useEffect(() => {
        // This effect will be triggered whenever unitCards or related data changes
        console.log("Unit cards changed, refreshing...");
        setRefreshCount(prevCount => prevCount + 1);
    }, [unitCards]);

    return (
        <div>
            <h3>Selected Faction: {selectedFaction}</h3>
            <h3>Selected Points: {selectedPoints}</h3>
            {Array.isArray(unitCards) && unitCards.length > 0 ? (
                unitCards.map((unitCard) => (
                    <UnitCard
                        key={unitCard.id}
                        name={unitCard.name}
                        army={unitCard.army}
                        image={unitCard.image}
                        category={unitCard.category}
                        canBeHero={unitCard.canBeHero}
                        numModels={unitCard.numModels}
                        points={unitCard.points}
                        movement={unitCard.movement}
                        toughness={unitCard.toughness}
                        save={unitCard.save}
                        wounds={unitCard.wounds}
                        leadership={unitCard.leadership}
                        objectiveControl={unitCard.objectiveControl}
                        // abilityList={unit.abilityList}
                        // wargearOptions={unit.wargearOptions}
                        defaultWeapon={unitCard.defaultWeapon}
                        // notes={unit.notes}
                        // additionalPoints={unit.additionalPoints}
                        showAddButton={showAddButton}
                        armyId={army.id}
                        armyListId={unitCard['army-listId']}
                        username={username}
                        unitCard={unitCard}
                        selectedArmy={selectedArmy} // Pass selectedArmy as a prop
                        selectedUnits={selectedUnits} // Pass selectedUnits as a prop
                        onDeleteUnit={onDeleteUnit}
                        setSelectedUnits={setSelectedUnits}
                        refreshCount={refreshCount}
                    />
                ))
            ) : (
                <p>No units available</p>
            )}
        </div>

    );
}
export default ArmyDetails;


