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
        // const data = [
        //     {id: 1, name: "Adrax Agatone", army: "Space Marines", category: "INFANTRY",canBeHero: true,numModels: 1,points: 100,movement: 6,toughness: 4,save: 2,wounds: 5,leadership: 6,objectiveControl: 1,abilityList: [],wargearOptions: [],defaultWeapon: "",image: "",notes: [],additionalPoints: []},
        // ]
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

//******* CRUD operations: get, add, update, delete PLAYER ARMIES to mockapi *******//

export const getPlayerArmy = async (username, armyId) => {
    try {
        const resp = await fetch(`${usersApiUrl}?username=${username}`);
        const data = await resp.json();

        if (armyId) {
            // If the armyId is provided, find and return the specific army data
            const user = data.find((user) => user.username === username);
            if (!user) {
                throw new Error("User not found.");
            }

            const armyData = user["player-army-list"].find((army) => army.id === armyId);
            return armyData || null; // Return null if the army is not found
        } else {
            // If no armyId is provided, return the entire array of armies for the user
            return data.find((user) => user.username === username)["player-army-list"];
        }
    } catch (e) {
        console.log("Error fetching player army: ", e);
        throw e;
    }
};

export const deletePlayerArmy = async (username, id) => {
    try {
        const resp = await fetch(`${usersApiUrl}?username=${username}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        return await resp.json();
    } catch (e) {
        console.log('could not delete army: ', e);
        throw e;
    }
};

export const updatePlayerArmy = async (username, armyId, updatedArmyData) => {
    try {
        const resp = await fetch(`${usersApiUrl}?username=${username}`);
        if (!resp.ok) {
            throw new Error('Failed to fetch player data');
        }

        const playerData = await resp.json();
        const user = playerData.find((user) => user.username === username);

        if (!user) {
            throw new Error("User not found.");
        }

        const updatedPlayerData = playerData.map((user) =>
            user.id === user.id
                ? {
                    ...user,
                    "player-army-list": user["player-army-list"].map((army) =>
                        army.id === armyId ? { ...army, units: updatedArmyData.units } : army
                    ),
                }
                : user
        );

        const updateResp = await fetch(`${usersApiUrl}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlayerData),
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

export const createPlayerArmy = async (selectedFaction, selectedPoints, username) => {
    const userArmyData = {
        id: uuidv4(), // Generate a unique ID for the army
        selectedFaction: selectedFaction.name,
        selectedPoints: selectedPoints,
        units: [],
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
            body: JSON.stringify(updatedUser), // Serialize the updated data to JSON
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

//********* CRUD operations to add, edit, delete USER information *********//
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

// export const updateUser = async (username, dataToUpdate) => {
//     try {
//         const resp = await fetch(`${usersApiUrl}/${username}`, {
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
