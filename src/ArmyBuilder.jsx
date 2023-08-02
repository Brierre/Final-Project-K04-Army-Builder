import React, { useEffect, useState } from 'react';
import PointsSelector from './PointsSelector';
import FactionCardList from './FactionCardList';
import FactionSelector from './FactionSelector';
import UnitSelector from './UnitSelector';
import { getFactions, createPlayerArmy } from './rest/api';

const ArmyBuilder = ({ isLoggedIn, onLogin, onLogout }) => {
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedFaction, setSelectedFaction] = useState(null);
    const [factionsData, setFactionsData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    // get factions data for creating faction cards, list, and selecting a faction
    useEffect(() => {
        const fetchFactionsData = async () => {
            try {
                const data = await getFactions();
                setFactionsData(data);
            } catch (e) {
                console.log("Error fetching factions data: ", e);
            }
        };

        fetchFactionsData();
    }, []);

    const handleSelectPoints = (points) => {
        setSelectedPoints(points);
    };

    const handleSelectFaction = (factionsData) => {
        setSelectedFaction(factionsData);
        setShowModal(false);
        console.log('Selected faction: ', factionsData);
    };

    const handleShowModal = (cardData) => {
        setSelectedCard(cardData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelectCard = (cardData) => {
        if (cardData.type === 'faction') {
            setSelectedFaction(cardData);
            handleCloseModal();
        }
    };

    const handleCreatePlayerArmy = async () => {
        try {
            if (isLoggedIn && selectedPoints && selectedFaction) {
                const userId = 'user123';
                console.log('Selected Faction: ', selectedFaction);
                const userArmyData = await createPlayerArmy(selectedFaction, selectedPoints, userId);

                console.log('Player army created successfully!', userArmyData);
            } else {
                console.log('Please log in to select points and faction before creating the army.');
            }
        }
        catch (error) {
            console.error('Error creating player army: ', error);
        };
    };

    return (
        <div>
            {selectedPoints === null ? (
                <PointsSelector onSelectPoints={handleSelectPoints} />
            ) : selectedFaction ? (
                <>
                    {/* Display the selected points and faction */}
                    <h3>Points: {selectedPoints}</h3>
                    <h3>Faction: {selectedFaction.name}</h3>

                    {/* Add a button to create the player army */}
                    <button onClick={handleCreatePlayerArmy}>Create Army</button>
                </>
            ) : (
                <FactionCardList
                    factionsData={factionsData} // Pass the factionsData as prop
                    onSelectFaction={handleSelectFaction} // Pass the handler function as prop
                    selectedPoints={selectedPoints} // Pass the selectedPoints as prop
                />
            )}
        </div>
    );
};

export default ArmyBuilder;
