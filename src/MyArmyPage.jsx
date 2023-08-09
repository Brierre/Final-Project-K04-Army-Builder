import React, { useEffect, useState } from 'react';
import { getArmyListHandler, getUnitsForArmy, deleteArmyHandler } from './rest/api';
import ArmyDetails from './ArmyDetails';
import UnitCardList from './UnitCardList';
import Button from 'react-bootstrap/Button';

function MyArmyPage({ username, isLoggedIn }) {
    const [armies, setArmies] = useState([]);
    const [selectedArmy, setSelectedArmy] = useState(null);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        // Fetch all armies for the given username
        const fetchArmies = async () => {
            try {
                const userArmies = await getArmyListHandler(username);
                setArmies(userArmies);
                setUserId(userId);
    
                if (userId && selectedArmy) {
                    const units = await getUnitsForArmy(userId, selectedArmy.id, selectedArmy['army-listId']);
                    setSelectedUnits(units);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchArmies();
    }, [username, selectedArmy]);

    
    
    
    

    const handleDeleteArmyClick = async () => {
        try {
            // Delete the army
            await deleteArmyHandler(username, selectedArmy.id);
    
            console.log('Successful deletion of army and its units');
            setSelectedArmy(null);
        } catch (error) {
            console.log('Error deleting army:', error);
        }
    };
    

    const handleArmyClick = async (army) => {
        setSelectedArmy(army);
        console.log('Army: ', army);

        try {
            console.log('armyId:', army.id);
        console.log('army-listId:', army['army-listId']);
            const units = await getUnitsForArmy(userId, army.id, army['army-listId']);
        
            console.log('Units for army: ', units);
            setSelectedUnits(units);
        } catch (error) {
            console.error('Error fetching units for army: ', error);
        }

    };

    return (
        <div>
            <h2>My Army Page</h2>
            {isLoggedIn ? (
                <>
                    <p>Welcome, {username}!</p>

                    {armies && armies.map((army) => (
                        <Button key={army.id} onClick={() => handleArmyClick(army)}>
                            Faction: {army.selectedFaction}
                            <br />
                            Points: {army.selectedPoints}
                        </Button>
                    ))}

                    {selectedArmy && (
                        <div>
                            <Button onClick={() => handleDeleteArmyClick()}>Delete Army</Button>
                            <ArmyDetails army={selectedArmy} unitCards={selectedUnits} showAddButton={false} />
                        </div>

                    )}
                </>
            ) : (
                <p>You must be logged in to view army information.</p>
            )}
        </div>
    )
}

export default MyArmyPage;
