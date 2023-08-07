import React, { useEffect, useState } from 'react';
import { getArmyList, deleteArmy } from './rest/api';
import ArmyDetails from './ArmyDetails';
import UnitCardList from './UnitCardList';
import Button from 'react-bootstrap/Button';

function MyArmyPage({ username }) {
    const [armies, setArmies] = useState([]);
    const [selectedArmy, setSelectedArmy] = useState(null);

    useEffect(() => {
        // Fetch all armies for the given username
        const fetchArmies = async () => {
            try {
                const playerArmies = await getArmyList(username);
                setArmies(playerArmies);
                console.log('player armies: ', playerArmies);
            } catch (error) {
                console.error('Error fetching player armies:', error);
            }
        };

        fetchArmies();
    }, [username]);


    const handleDeleteArmyClick = async () => {
        try {
            await deleteArmy(username, selectedArmy.id);
            console.log('Successful deletion of army');
            setSelectedArmy(null);
        } catch (error) {
            console.log('Error deleting army: ', error);
        }
    };

    const handleArmyClick = (army) => {
        setSelectedArmy(army);
        console.log('selectedarmy: ', selectedArmy);
    };

    return (
        <div>
            <h2>My Army Page</h2>
            <p>Welcome, {username}!</p>

            {armies.map((army) => (
                <button key={army.id} onClick={() => handleArmyClick(army)}>
                    Faction: {army.selectedFaction}
                    <br />
                    Points: {army.selectedPoints}
                </button>
            ))}

            {selectedArmy && (
                <div>
                    <ArmyDetails army={selectedArmy} showAddButton={false} />
                    <Button onClick={() => handleDeleteArmyClick()}>Delete Army</Button>
                </div>
            )}
        </div>
    )
}

export default MyArmyPage;
