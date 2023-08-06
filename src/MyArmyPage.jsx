// import React, { useEffect, useState } from 'react';
// import UnitCard from './UnitCard';
// import CardModal from './CardModal';
// import { Link } from 'react-router-dom';
// import { updatePlayerArmy, getPlayerArmy } from './rest/api';
// import RunningTotal from './RunningTotal';
// import { calculateTotalPoints } from './utils';

// const MyArmyPage = ({ selectedUnits, username, onRemoveFromArmy }) => {
//     const [playerData, setPlayerData] = useState(null);
//     const [selectedCardData, setSelectedCardData] = useState(null);
//     const [selectedPoints, setSelectedPoints] = useState(null);

//     const handleRemoveFromArmy = (cardData) => {
//         const pointsToAdd = cardData.points;
//         setSelectedPoints((prevPoints) => (prevPoints !== null ? prevPoints + pointsToAdd : null));
//     };

//     const totalPoints = calculateTotalPoints(playerData.units);
//     console.log("total points before update: ", totalPoints);

//     return (
//         <>
//         <h3>My armies</h3>
//             {playerData !== null && (
//                 <>
//                     <RunningTotal selectedPoints={calculateTotalPoints(playerData.units)} />

//                     {selectedUnits.map((unit) => (
//                         <UnitCard
//                             key={unit.id}
//                             name={unit.name}
//                             faction={unit.army}
//                             image={unit.image}
//                             category={unit.category}
//                             canBeHero={unit.canBeHero}
//                             numModels={unit.numModels}
//                             points={unit.points}
//                             movement={unit.movement}
//                             toughness={unit.toughness}
//                             save={unit.save}
//                             wounds={unit.wounds}
//                             leadership={unit.leadership}
//                             abilityList={unit.abilityList}
//                             wargearOptions={unit.wargearOptions}
//                             defaultWeapon={unit.defaultWeapon}
//                             notes={unit.notes}
//                             additionalPoints={unit.additionalPoints}
//                             //onSelectCard={handleAddCardToArmy}
//                             //onRemoveFromArmy={handleRemoveFromArmy}
//                         />
//                     ))}
//                     <CardModal
//                         cardData={selectedCardData}
//                         show={selectedCardData !== null}
//                         onClose={() => setSelectedCardData(null)}
//                         selectedPoints={selectedPoints}
//                     />
//                 </>
//             )}
//         </>
//     );
// };

// export default MyArmyPage;
import React, { useEffect, useState } from 'react';

const MyArmyPage = () => {
    const [playerData, setPlayerData] = useState(null);


    const getUsersData = async () => {
        try {
            const response = await fetch('https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users?username=heather');
            if (!response.ok) {
                throw new Error('Failed to fetch users data');
            }
            const users = await response.json();
            console.log(users);
            return users;
        } catch (error) {
            console.error('Error fetching users data:', error);
            return [];
        }
    };

    useEffect(() => {
        getUsersData()
            .then((data) => {
                console.log("API Response:", data);
                setPlayerData(data)})
            .catch((error) => console.error('Error fetching player data:', error));
    }, []);

    if (playerData === null) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    // Assuming 'player-army-list' is an array in playerData
    const playerArmyList = playerData['player-army-list'];

    return (
        <div>
            <h1>My Army Page</h1>
            {playerData && playerData["player-army-list"] && (
                <div>
                    <h2>My Armies</h2>
                    <ul>
                        {playerData["player-army-list"].map((army) => (
                            <li key={army.id}>{army.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyArmyPage;
