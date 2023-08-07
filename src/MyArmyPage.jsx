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
