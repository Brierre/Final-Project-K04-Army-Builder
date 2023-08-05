import React, {useState, useEffect } from 'react';
import UnitCard from './UnitCard';

const UnitTab = ({ units, selectedFaction, username }) => {
    const [filteredUnits, setFilteredUnits] = useState([]);

    useEffect(() => {
        if (selectedFaction && selectedFaction.name) {
            // Filter units by faction
            const filteredByFaction = units.filter((unit) => unit.army === selectedFaction.name);
            setFilteredUnits(filteredByFaction);
            console.log("filtered list: ", filteredByFaction)
        } else {
            setFilteredUnits([]);
        }
    }, [units, selectedFaction]);

    return (
        <div className="unit-cards">
            {filteredUnits.length === 0 ? (
                <div>No units in this category</div>
            ) : (
            filteredUnits.map((unitCard) => 
                unitCard && unitCard.name && (
                <UnitCard
                    key={unitCard.id}
                    name={unitCard.name}
                    army={unitCard.army}
                    canBeHero={unitCard.canBeHero}
                    numModels={unitCard.numModels}
                    points={unitCard.points}
                    movement={unitCard.movement}
                    toughness={unitCard.toughness}
                    save={unitCard.save}
                    wounds={unitCard.wounds}
                    leadership={unitCard.leadership}
                    objectiveControl={unitCard.objectiveControl}
                    abilityList={unitCard.abilityList}
                    wargearOptions={unitCard.wargearOptions}
                    defaultWeapon={unitCard.defaultWeapon}
                    image={unitCard.image}
                    notes={unitCard.notes}
                    additionalPoints={unitCard.additionalPoints}
                    username={username}
                />
            ))
        )}
        </div>
    );
};

export default UnitTab;