import React, { useEffect, useState } from 'react';
import UnitCard from './UnitCard';
import CardModal from './CardModal';
import { Link } from 'react-router-dom';
import { updatePlayerArmy, getPlayerArmy } from './rest/api';
import RunningTotal from './RunningTotal';
import { calculateTotalPoints } from './utils';

const MyArmyPage = ({ selectedUnits, username, onRemoveFromArmy }) => {
    const [playerData, setPlayerData] = useState(null);
    const [selectedCardData, setSelectedCardData] = useState(null);
    const [selectedPoints, setSelectedPoints] = useState(null);

    const handleRemoveFromArmy = (cardData) => {
        const pointsToAdd = cardData.points;
        setSelectedPoints((prevPoints) => (prevPoints !== null ? prevPoints + pointsToAdd : null));
    };

    const totalPoints = calculateTotalPoints(playerData.units);
    console.log("total points before update: ", totalPoints);

    return (
        <>
            {playerData !== null && (
                <>
                    <RunningTotal selectedPoints={calculateTotalPoints(playerData.units)} />
                    <h3>My Army</h3>
                    {selectedUnits.map((unit) => (
                        <UnitCard
                            key={unit.id}
                            name={unit.name}
                            faction={unit.army}
                            image={unit.image}
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
                            //onSelectCard={handleAddCardToArmy}
                            //onRemoveFromArmy={handleRemoveFromArmy}
                        />
                    ))}
                    <CardModal
                        cardData={selectedCardData}
                        show={selectedCardData !== null}
                        onClose={() => setSelectedCardData(null)}
                        selectedPoints={selectedPoints}
                    />
                </>
            )}
        </>
    );
};

export default MyArmyPage;