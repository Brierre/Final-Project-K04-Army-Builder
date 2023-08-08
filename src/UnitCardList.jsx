import React from "react";
import UnitCard from './UnitCard';

const UnitCardList = ({ unitCards, showAddButton, unitsData }) => {
    return (
        <div>
            <div className="unit-cards">
                {Array.isArray(unitCards) ? (
                    unitCards.map((unit) => (
                        <UnitCard
                            key={unit.id}
                            name={unit.name}
                            faction={unit.army}
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
                            defaultWeapon={unit.defaultWeapon}
                            showAddButton={showAddButton}
                            unitsData={unitsData}
                        // abilityList={unit.abilityList}
                        // wargearOptions={unit.wargearOptions}
                        // notes={unit.notes}
                        // additionalPoints={unit.additionalPoints}
                        />
                    ))
                ) : (
                    <p>Loading units data...</p>
                )}
            </div>
        </div>
    );
};

export default UnitCardList;