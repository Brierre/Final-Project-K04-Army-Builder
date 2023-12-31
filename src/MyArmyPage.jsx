import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { getArmyListHandler, getUserIdByUsername, getUnitsForArmy, deleteAllUnitsForArmyHandler, deleteArmyHandler } from './rest/api';
import ArmyDetails from './ArmyDetails';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function MyArmyPage({ username, isLoggedIn }) {
    const [armies, setArmies] = useState([]);
    const [selectedArmy, setSelectedArmy] = useState(null);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('myAppData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setArmies(parsedData.armies);
            setSelectedUnits(parsedData.units);
        }
    }, []);

    useEffect(() => {
        // Fetch all armies for the given username

        const fetchArmies = async () => {
            try {
                const userArmies = await getArmyListHandler(username);
                setArmies(userArmies);
                setUserId(userId);
                // console.log('wtf armies: ', userArmies);
            } catch (error) {
                console.error('Error fetching user armies:', error);
            }
        };
        fetchArmies();
    }, [username]);

    useEffect(() => {
        if (userId && selectedArmy) {
            const fetchUnits = async () => {
                try {
                    const units = await getUnitsForArmy(username, selectedArmy.id, selectedArmy['army-listId']);
                    sessionStorage.setItem('myAppData', JSON.stringify(newData));
                    console.log('Units for army: ', units);
                    setSelectedUnits(units);
                } catch (error) {
                    console.error('Error fetching units for army: ', error);
                }
            };

            fetchUnits();
        }
    }, [userId, selectedArmy]);

    const handleDeleteArmyClick = async () => {
        try {
            // Delete all units for the army
            await deleteAllUnitsForArmyHandler(username, selectedArmy.id, selectedArmy.id);
            // Delete the army after all units are deleted
            await deleteArmyHandler(username, selectedArmy.id);
            setArmies((prevArmies) => prevArmies.filter(army => army.id !== selectedArmy.id));
            console.log('Successful deletion of army and its units');
            setSelectedArmy(null);
        } catch (error) {
            console.log('Error deleting army:', error);
        }
    };

    const handleDeleteUnit = async (unitId) => {
        try {
            const updatedUnits = selectedUnits.filter((unit) => unit.id !== unitId);

            // Delete the unit using the API function
            await deleteUnitHandler(userId, selectedArmy.id, unitId);

            setSelectedUnits(updatedUnits);
        } catch (error) {
            console.error('Error deleting unit:', error);
        }
    }

    const handleArmyClick = async (army) => {
        setSelectedArmy(army);
        console.log('Army: ', army);

        try {
            const userId = await getUserIdByUsername(username);

            console.log('armyId:', army.id);
            const units = await getUnitsForArmy(userId, army.id, army.id);
            setSelectedUnits(units);

        } catch (error) {
            console.error('Error fetching units for army: ', error);
        }
    };

    const debouncedHandleArmyClick = debounce(handleArmyClick, 500); // Adjust the debounce delay as needed

    return (
        <div>
            <p>Welcome, {username}!</p>
            
            <h2>Army List</h2>

            {isLoggedIn ? (
                <>
                    <div className="army-list">
                        {armies.length > 0 ? (
                            armies.map((army) => (
                                <div key={army.id}>
                                <Button
                                    key={army.id}
                                    variant="primary"
                                    className={`army-button ${selectedArmy?.id === army.id ? 'active' : ''}`}
                                    onClick={() => debouncedHandleArmyClick(army)}
                                >
                                    {army.selectedFaction}
                                    <br/>
                                    {army.selectedPoints}
                                </Button>
                                </div>
                            ))
                        ) : (
                            <p>No armies available</p>
                        )}
                    </div>

                    {selectedArmy && (
                        <div>
                            <div>
                                <Button onClick={() => handleDeleteArmyClick()}>Delete Army</Button>
                            </div>
                            <ArmyDetails
  army={selectedArmy}
  unitCards={selectedUnits}
  showAddButton={false}
  username={username}
  selectedArmy={selectedArmy} // Pass selectedArmy here
  selectedUnits={selectedUnits} // Pass selectedUnits here
  onDeleteUnit={handleDeleteUnit}
  setSelectedUnits={setSelectedUnits}
/>
                        </div>
                    )}

                    <p>
                        Don't see any armies? <Link to="/army-builder">Create one!</Link>
                    </p>
                </>
            ) : (
                <div>
                    <p>You must be logged in to view army information.</p>
                    <Link to="/login"><Button>Log in</Button></Link></div>
            )}
        </div>
    )
}

export default MyArmyPage;
