//ACCESSING MOCKAPI DATA
//old data tree: https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users/1/player-army-list/2/army-units
//units within a player army are at player-army-list/army-units
//units for filtering and selection are mockApiUnitsJson

import { v4 as uuidv4 } from 'uuid';

// base API URL for mockapi
const baseUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1';

const factionRulesApiUrl = `${baseUrl}/army-rules`;
const detachmentsApiUrl = `${baseUrl}/detachments`;
const detachmentRulesApiUrl = `${baseUrl}/detachment-rules`;
const enhancementsApiUrl = `${baseUrl}/enhancements`;
const factionsApiUrl = `${baseUrl}/factions`;
const stratagemsApiUrl = `${baseUrl}/stratagems`;
const mockapiUnitsJson = `${baseUrl}/units-data`;
const usersApiUrl = `${baseUrl}/users`;
const armyListApiUrl = (userId) => `${usersApiUrl}/${userId}/army-list`;
const unitsApiUrl = (userId, armyId) => `${armyListApiUrl(userId)}/${armyId}/units`;
const additionalPointsApiUrl = (userId, armyId, unitId) => `${unitsApiUrl(userId, armyId)}/${unitId}/additionalPoints`;
const additionalStatsApiUrl = (userId, armyId, unitId) => `${unitsApiUrl(userId, armyId)}/${unitId}/additional-stats`;
// const armyListApiUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/users/army-list';
// const unitsApiUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/users/army-list/units';
// const additionalPointsApiUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/users/army-list/units/additional-points';
// const additionalStatsApiUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/users/army-list/units/additional-stats';


export const getUserIdByUsername = async (username) => {
    try {
        const usersData = await getUsersData();
        const user = usersData.find((user) => user.username === username);
        return user ? user.id : null; // Return userId if user exists, otherwise null
    } catch (error) {
        console.error('Error getting user ID by username:', error);
        return null;
    }
};

export const getArmyListHandler = async (username, armyId = null) => {
    try {
        const userId = await getUserIdByUsername(username); // Get the userId first
        if (!userId) {
            console.log('User not found for the given username:', username);
            return;
        }

        // Call the createArmy function with the obtained userId
        const data = await getArmyList(userId, armyId);

        // Handle the response data
        console.log('Created army:', data);
    } catch (error) {
        console.error('Error creating army:', error);
    }
};

const getArmyList = async (userId, armyId = null) => {
    
    try {
        let apiUrl = armyListApiUrl(userId);
        if (armyId) {
            apiUrl += `/${armyId}`;
        }

        const resp = await fetch(apiUrl);
        if (!resp.ok) {
            throw new Error('Failed to fetch player armies.');
        }

        const data = await resp.json();

        if (armyId) {
            // If the armyId is provided, find and return the specific army data
            return data || null;
        } else {
            return data || [];
        }
    } catch (error) {
        throw new Error('Error fetching player armies: ' + error.message);
    }
};


export const createArmyHandler = async (username, selectedFaction, selectedPoints) => {
    try {
        const userId = await getUserIdByUsername(username); // Get the userId first
        if (!userId) {
            console.log('User not found for the given username:', username);
            return;
        }

        // Call the createArmy function with the obtained userId
        const armyData = await createArmy(userId, selectedFaction, selectedPoints);
        const armyId = armyData.id;
        console.log('Created army:', armyData, armyId);
        if (armyData) {
        return armyData;
        } else {
            throw new Error("failed to create player army");
        }
    } catch (error) {
        console.error('Error creating army:', error);
    }
};

const createArmy = async (userId, selectedFaction, selectedPoints) => {
    try {

        const userArmyData = {
            userId: userId, // Include the userId in the userArmyData
            selectedFaction: selectedFaction.name,
            selectedPoints: selectedPoints,
            createdAt: new Date().toISOString(),
        };

        try {
            const resp = await fetch(armyListApiUrl(userId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userArmyData),
            });
    
            if (!resp.ok) {
                throw new Error("Failed to create player army.");
            }
    
            const data = await resp.json();
            console.log("Response from fetch:", data);
            return data;

        } catch (error) {
            console.error("Error creating player army:", error);
            throw error;
        }
    } catch (error) {
        console.error("Error getting user ID by username:", error);
        throw error;
    }
};


export const updateArmyHandler = async (username, armyId, updatedArmyData) => {
    try {
        const userId = await getUserIdByUsername(username); // Get the userId first
        if (!userId) {
            console.log('User not found for the given username:', username);
            return;
        }

        // Call the createArmy function with the obtained userId
        const data = await updateArmy(userId, armyId, updatedArmyData);

        // Handle the response data
        console.log('Created army:', data);
    } catch (error) {
        console.error('Error creating army:', error);
    }
};

const updateArmy = async (userId, armyId, updatedArmyData) => {
    try {
        const resp = await fetch(unitsApiUrl(userId, armyId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedArmyData),
        });

        if (!resp.ok) {
            throw new Error("Failed to update player army.");
        }

        const updatedData = await resp.json();
        return updatedData;
    } catch (error) {
        console.error("Error updating player army:", error);
        throw error;
    }
};

export const deleteArmyHandler = async (username, armyId) => {
    try {
        const userId = await getUserIdByUsername(username); // Get the userId first
        if (!userId) {
            console.log('User not found for the given username:', username);
            return;
        }

        // Call the createArmy function with the obtained userId
        const data = await deleteArmy(userId, armyId);

        // Handle the response data
        console.log('Created army:', data);
    } catch (error) {
        console.error('Error creating army:', error);
    }
};

const deleteArmy = async (userId, armyId) => {
    try {
        const apiUrl = unitsApiUrl(userId, armyId);
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

// //******* CRUD operations: get, add, update, delete PLAYER ARMIES to mockapi *******//


export const getUsersData = async () => {
    try {
        const response = await fetch(usersApiUrl);
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




export const getMostRecentArmyId = async (username) => {
    try {
        // Fetch all users data
        const usersData = await getUsersData();

        // Find the user data by username
        const user = usersData.find((user) => user.username === username);

        // Check if the user exists and has "player-army-list" data
        if (user && user["army-list"] && user["army-list"].length > 0) {
            // Sort the "player-army-list" array by createdAt timestamp in descending order
            const sortedArmies = user["army-list"].sort(
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



// const factionDetachmentMap = {
//     "DetachmentA": "Space Marines",
//     "DetachmentB": "Orks",
//     "DetachmentC": "Dark Angels",
//     "DetachmentD": "Necrons",
// };


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

// // export const updateUser = async (username, dataToUpdate) => {
// //     try {
// //         const resp = await fetch(`${usersApiUrl}/bruce`, {
// //             method: 'PUT',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify(dataToUpdate)
// //         });
// //         return await resp.json();
// //     } catch (e) {
// //         console.log('could not update army: ', e);
// //         throw e;
// //     }
// // }

// // export const deleteUser = async (id) => {
// //     try {
// //         const resp = await fetch(`${usersApiUrl}/${id}`, {
// //             method: 'DELETE',
// //         });
// //         return await resp.json();
// //     } catch (e) {
// //         console.log('could not delete user: ', e);
// //         throw e;
// //     }
// // };



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
