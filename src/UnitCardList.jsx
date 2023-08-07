import React from "react";
import UnitCard from './UnitCard';

const UnitCardList = ({ unitCards, showAddButton }) => {
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
                            abilityList={unit.abilityList}
                            wargearOptions={unit.wargearOptions}
                            defaultWeapon={unit.defaultWeapon}
                            notes={unit.notes}
                            additionalPoints={unit.additionalPoints}
                            showAddButton={showAddButton}
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