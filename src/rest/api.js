//ACCESSING MOCKAPI DATA
//https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users/1/player-army-list/2/army-units
//units within a player army are at player-army-list/army-units
//units for filtering and selection are mockApiUnitsJson

import { v4 as uuidv4 } from 'uuid';

const factionRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/army-rules';
const detachmentsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/detachments';
const detachmentRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/detachment-rules';
const enhancementsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/enhancements';
const factionsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/factions';
const stratagemsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/stratagems';
const mockapiUnitsJson = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/units-data';
const usersApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users';
// https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users/1/player-army-list/2/army-units
// https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users/1/player-army-list/3/army-units/5/additionalPoints




//******* CRUD operations: get, add, update, delete PLAYER ARMIES to mockapi *******//

export const getArmyList = async (username, armyId = null) => {
    try {
        let apiUrl = usersApiUrl; // Initialize apiUrl as let instead of const
        if (armyId) {
            apiUrl += `&armyId=${armyId}`;
        }

        const resp = await fetch(apiUrl);
        if (!resp.ok) {
            throw new Error('Failed to fetch player armies.');
        }

        const data = await resp.json();

        if (armyId) {
            // If the armyId is provided, find and return the specific army data
            return data[0]?.['player-army-list'][0] || null;
        } else {
            return data[0]?.['player-army-list'] || [];
        }
    } catch (error) {
        throw new Error('Error fetching player armies: ' + error.message);
    }
};



export const getUsersData = async () => {
    try {
        const response = await fetch(usersApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users data:', error);
        return [];
    }
};

export const getMostRecentArmyId = async (username) => {
    try {
        // Fetch all users data
        const usersData = await getUsersData();

        // Find the user data by username
        const user = usersData.find((user) => user.username === username);

        // Check if the user exists and has "player-army-list" data
        if (user && user["player-army-list"] && user["player-army-list"].length > 0) {
            // Sort the "player-army-list" array by createdAt timestamp in descending order
            const sortedArmies = user["player-army-list"].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            // Return the armyId of the most recent army
            return sortedArmies[0].id;
        }

        // Return null if no army found
        return null;
    } catch (error) {
        console.error('Error getting most recent army ID:', error);
        return null;
    }
};

export const deleteArmy = async (username, armyId) => {
    console.log('Deleting army: ', armyId, 'for user: ', username);
    const apiUrl = `${usersApiUrl}/${username}/player-army-list?id=${armyId}`;
    console.log('API URL:', apiUrl);
    
    try {
        const resp = await fetch(apiUrl, {
            method: 'DELETE',
        });

        if (!resp.ok) {
            throw new Error('Failed to delete army');
        }

        // If the response is successful, return the parsed data
        return resp.json();
    } catch (error) {
        console.error('Error deleting army:', error);
        throw error;
    }
};

export const updateArmy = async (username, armyId, updatedArmyData) => {
    try {
        // Fetch the player data based on the username
        const resp = await fetch(`${usersApiUrl}?username=${username}`);
        if (!resp.ok) {
            throw new Error("Failed to fetch player data");
        }

        const playerData = await resp.json();
        const userIndex = playerData.findIndex((user) => user.username === username);

        if (userIndex === -1) {
            throw new Error("User not found.");
        }

        // Find the specific army in the player data using the given armyId
        const playerArmyList = playerData[userIndex]["player-army-list"];
        const armyIndex = playerArmyList.findIndex((army) => army.id === armyId);

        if (!armyIndex === -1) {
            throw new Error("Army not found.");
        }

        // Ensure that updatedArmyData and updatedArmyData.units are valid
        if (!updatedArmyData || !Array.isArray(updatedArmyData.units)) {
            throw new Error("Invalid data provided to update the army.");
        }

        // Update the units array of the specific army with the new units
        playerArmyList[armyIndex].units.push(...updatedArmyData.units);

        // Send a PUT request to update the player data on the server
        const updateResp = await fetch(`${usersApiUrl}/${playerData[userIndex].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playerData[userIndex]),
        });

        if (!updateResp.ok) {
            throw new Error("Failed to update player data.");
        }

        const updatedData = await updateResp.json();
        return updatedData;
    } catch (error) {
        console.error("Error updating player army:", error);
        throw error;
    }
};


const factionDetachmentMap = {
    "DetachmentA": "Space Marines",
    "DetachmentB": "Orks",
    "DetachmentC": "Dark Angels",
    "DetachmentD": "Necrons",
};

export const createArmy = async (selectedFaction, selectedPoints, username) => {
    const userArmyData = {
        id: uuidv4(), // Generate a unique ID for the army
        selectedFaction: selectedFaction.name,
        selectedPoints: selectedPoints,
        units: [],
        createdAt: new Date().toISOString(),
    };

    try {
        // Fetch the player's existing data
        const resp = await fetch(`${usersApiUrl}?username=${username}`);
        if (!resp.ok) {
            throw new Error("Failed to fetch player data.");
        }
        const playerData = await resp.json();

        // Find the correct user object based on the username and get the userId
        const user = playerData.find((user) => user.username === username);

        if (!user) {
            throw new Error("User not found.");
        }

        // Update the "player-army-list" array with the new userArmyData
        const updatedUser = {
            ...user,
            "player-army-list": [...user["player-army-list"], userArmyData],
        };

        // Update the player's data with the modified "player-army-list" array
        const updateResp = await fetch(`${usersApiUrl}/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        if (!updateResp.ok) {
            throw new Error("Failed to update player data.");
        }

        const updatedData = await updateResp.json();
        return updatedData;
    } catch (error) {
        console.error("Error creating player army:", error);
        throw error;
    }
};



//*********** operations to add, edit, delete USER information ************//
//****************** not fully implemented at this time *******************//

export const createNewUser = async (username, password) => {
    try {
        const user = { username, password };
        const resp = await fetch(`${usersApiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await resp.json();
    } catch (e) {
        console.log('could not create user: ', e);
        throw e;
    }
};
//testing
export const updateUser = async (username, dataToUpdate) => {
    try {
        const resp = await fetch(`${usersApiUrl}/${username}/test`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        });

        if (!resp.ok) {
            throw new Error('Failed to update user');
        }

        return await resp.json();
    } catch (e) {
        console.log('Could not update user: ', e);
        throw e;
    }
};

// export const updateUser = async (username, dataToUpdate) => {
//     try {
//         const resp = await fetch(`${usersApiUrl}/bruce`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(dataToUpdate)
//         });
//         return await resp.json();
//     } catch (e) {
//         console.log('could not update army: ', e);
//         throw e;
//     }
// }

// export const deleteUser = async (id) => {
//     try {
//         const resp = await fetch(`${usersApiUrl}/${id}`, {
//             method: 'DELETE',
//         });
//         return await resp.json();
//     } catch (e) {
//         console.log('could not delete user: ', e);
//         throw e;
//     }
// };



//******* operations to fetch data for army selection *******//

export const getFactions = async () => {
    try {
        const resp = await fetch(`${factionsApiUrl}`);
        const data = await resp.json();
        return data;
    } catch (e) {
        console.log("Error fetching factions: ", e);
        throw e;
    }
};

export const getUnitsData = async () => {
    try {
        const resp = await fetch(mockapiUnitsJson);
        if (!resp.ok) {
            throw new Error('Failed to fetch units data');
        }

        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
            return data;
        } else {
            console.log('No units data found or data is not in the expected format.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching units data:', error);
        return [];
    }
};

export const getDetachments = async () => {
    try {
        const resp = await fetch(`${detachmentsApiUrl}`);
        const data = await resp.json();
        console.log("detachment data: ", data)
        return data;
    } catch (e) {
        console.log("Error fetching detachments: ", e);
        throw e;
    }
};

//********* INFORMATIONAL data only, to be used in navbar links as TABLES *********//
//******** Not implemented using these/data not fetching in component file ********//

export const getFactionRules = async () => {
    try {
        const resp = await fetch(`${factionRulesApiUrl}`);
        const data = await resp.json();
        console.log("Faction rules data:", data);
        return data;
    } catch (e) {
        console.log("Error fetching faction rules: ", e);
        throw e;
    }
};

export const getDetachmentRules = async () => {
    try {
        const resp = await fetch(`${detachmentRulesApiUrl}`);
        const data = await resp.json();
        console.log("Detachment rules data:", data);
        return data;
    } catch (e) {
        console.log("Error fetching detachment rules: ", e);
        throw e;
    }
};

export const getEnhancements = async () => {
    try {
        const resp = await fetch(`${enhancementsApiUrl}`);
        const data = await resp.json();
        console.log("Enhancements data:", data);
        return data;
    } catch (e) {
        console.log("Error fetching enhancements: ", e);
        throw e;
    }
};

export const getStratagems = async () => {
    try {
        const resp = await fetch(`${stratagemsApiUrl}/`);
        const data = await resp.json();
        console.log("Stratagems data:", data);
        return data;
    } catch (e) {
        console.log("Error fetching stratagems: ", e);
        throw e;
    }
};
