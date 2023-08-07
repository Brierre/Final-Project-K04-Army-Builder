import React, { useEffect, useState, useRef } from 'react';
import PointsSelector from './PointsSelector';
import FactionCardList from './FactionCardList';
import { getFactions, createPlayerArmy, getMostRecentArmyId } from './rest/api';
import { Link, useNavigate } from 'react-router-dom';
import RunningTotal from './RunningTotal';
import UnitSelector from './UnitSelector';


const ArmyBuilder = ({ isLoggedIn, onLogin, onLogout, username }) => {
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedFaction, setSelectedFaction] = useState(null);
    const [factionsData, setFactionsData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [armyId, setArmyId] = useState(null);
    const [isArmyCreated, setIsArmyCreated] = useState(false);
    const navigate = useNavigate();
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

    const handleCreatePlayerArmy = async () => {
        console.log("selectedFaction ", selectedFaction);

        try {
            if (isLoggedIn && selectedPoints && selectedFaction) {
                console.log('Selected Faction: ', selectedFaction);
                const userArmyData = await createPlayerArmy(selectedFaction, selectedPoints, username);
                const armyId = await getMostRecentArmyId(username);
                setArmyId(armyId);
                console.log('Player army created successfully!', userArmyData, isArmyCreated, armyId);
                setIsArmyCreated(true);
                console.log("is army ACTUALLY created?? ", isArmyCreated);
                const stateProps = {
                    selectedFaction,
                    username,
                    armyId,
                };
                navigate(`/unit-selector?selectedFaction=${encodeURIComponent(JSON.stringify(selectedFaction))}&username=${encodeURIComponent(username)}&armyId=${encodeURIComponent(armyId)}`);

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

    const handleSelectFaction = (factionsData) => {
        setSelectedFaction(factionsData);
        setModalShow(false);
        console.log('Selected faction: ', factionsData);
    };

    const handleShowModal = (cardData) => {
        setSelectedCard(cardData);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
    };

    return (
        <div>
            {selectedPoints !== null && <RunningTotal selectedPoints={selectedPoints} />}

            {selectedPoints === null ? (
                <PointsSelector onSelectPoints={handleSelectPoints} />
            ) : selectedFaction ? (
                <>
                    {/* Display the selected points and faction */}
                    <h3>Points: {selectedPoints}</h3>
                    <h3>Faction: {selectedFaction.name}</h3>

                    {/* Add a button to create the player army */}
                    <Link to="/unit-selector">
                        <button onClick={handleCreatePlayerArmy}>Create Army</button>
                    </Link>
                    {isArmyCreated ? (
                        <UnitSelector selectedFaction={selectedFaction} username={username} armyId={armyId} isArmyCreated={isArmyCreated} />
                    ) : null}
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
