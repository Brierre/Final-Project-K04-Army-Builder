import React, { useEffect, useState, useRef } from 'react';
import PointsSelector from './PointsSelector';
import FactionCardList from './FactionCardList';
import { getFactions, createArmyHandler, getUnitsData } from './rest/api';
import UnitSelector from './UnitSelector';
import { calculateTotalPoints } from './utils.js'; 


const ArmyBuilder = ({ isLoggedIn, onLogin, onLogout, username }) => {
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedFaction, setSelectedFaction] = useState('');
    const [factionsData, setFactionsData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [armyId, setArmyId] = useState(null);
    const [isArmyCreated, setIsArmyCreated] = useState(false);
    const [unitsData, setUnitsData] = useState([]);

    const isInitialRender = useRef(true);
    //console.log("ArmyBuilder rendered!");

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

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            // It's not the first rendering, so log the value of isArmyCreated
            console.log("isArmyCreated changed:", isArmyCreated);
        }
    }, [isArmyCreated]);

    useEffect(() => {
        const fetchUnitsData = async () => {
            try {
                const data = await getUnitsData();
                setUnitsData(data);
                // console.log(data);
            } catch (e) {
                console.log("Error fetching units data: ", e);
            }
        };

        fetchUnitsData();
    }, []);

    const handleCreateArmy = async () => {

        try {
            if (isLoggedIn && selectedPoints && selectedFaction) {
                console.log('Selected Faction for username : ', username, selectedFaction, selectedPoints);
                const userArmyData = await createArmyHandler(username, selectedFaction, selectedPoints);
                const armyId = userArmyData.id;
                console.log('army id: ', armyId);
                setArmyId(armyId, userArmyData);
                console.log('Player army created successfully!', userArmyData, isArmyCreated, armyId);
                setIsArmyCreated(true);
                console.log('army data: ', userArmyData);
            } else {
                console.log('Please log in to select points and faction before creating the army.');
            }
        } catch (error) {
            console.error('Error creating player army: ', error);
        }
    };

    const handleSelectPoints = (points) => {
        setSelectedPoints(points);
    };

    const handleSelectFaction = (faction) => {
        if (!selectedFaction) {
            setSelectedFaction(faction);
            setModalShow(false);
            // console.log('Selected faction: ', faction);
        };
    }

    const handleShowModal = (cardData) => {
        setSelectedCard(cardData);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
    };

    const totalPoints = calculateTotalPoints(unitsData);

    return (
        <div>
            {selectedPoints === null ? (
                <PointsSelector onSelectPoints={handleSelectPoints} />
            ) : selectedFaction ? (
                <>
                    {/* Display the selected points and faction */}
                    <h3>Points: {selectedPoints}</h3>
                    <h3>Faction: {selectedFaction.name}</h3>
                    {isArmyCreated ? (
                        <div>
                            <p>Army has been created!</p>
                        </div>
                    ) : (
                        <button onClick={handleCreateArmy}>Create Army</button>
                    )}
                </>
            ) : null}
            {!selectedFaction && (
                <FactionCardList
                    factionsData={factionsData}
                    onSelectFaction={handleSelectFaction}
                    selectedPoints={selectedPoints}
                />
            )}
            {selectedFaction && isArmyCreated && (
                <UnitSelector
                    selectedFaction={selectedFaction}
                    selectedPoints={selectedPoints}
                    username={username}
                    armyId={armyId}
                    isArmyCreated={isArmyCreated}
                    unitsData={unitsData}
                />
            )}
        </div>
    );
};

export default ArmyBuilder;
