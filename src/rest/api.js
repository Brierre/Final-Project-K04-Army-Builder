// base API URL for mockapi
const baseUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1';

const factionRulesApiUrl = `${baseUrl}/army-rules`;
const detachmentsApiUrl = `${baseUrl}/detachments`;
const detachmentRulesApiUrl = `${baseUrl}/detachment-rules`;
const enhancementsApiUrl = `${baseUrl}/enhancements`;
const factionsApiUrl = `${baseUrl}/factions`;
const stratagemsApiUrl = `${baseUrl}/stratagems`;
const mockapiUnitsJson = `${baseUrl}/units-data`;
const usersApiUrl = `${baseUrl}/users`; // get list of users
const getUserApiUrl = (userId) => `${usersApiUrl}/${userId}`; // get specific user
const getArmyListApiUrl = (userId) => `${usersApiUrl}/${userId}/army-list`; // get list of armies for specific userId
const getUnitsApiUrl = (userId, armyId, armyListId) => `${getArmyListApiUrl(userId)}/${armyId}/units?army-ListId=${armyListId}`; // get units list
const postArmyListApiUrl = (userId) => `${usersApiUrl}/${userId}/army-list`; // create a new army
const deleteArmyApiUrl = (userId, armyId) => `${getArmyListApiUrl(userId)}/${armyId}`; // delete a specific armyId
const postUnitsApiUrl = (userId, armyId) => `${getArmyListApiUrl(userId)}/${armyId}/units`; // create first unit in army to establish array of units
const putUnitsApiUrl = (userId, armyId, armyListId) => `${getArmyListApiUrl(userId)}/${armyId}/units/${armyListId}`; // add subsequent units to array
const deleteArmyUnitsApiUrl = (userId, armyId, unitId, armyListId) => {
    if (armyListId) {
        return `${getArmyListApiUrl(userId)}/${armyId}/units/${armyListId}`;
    } else {
        return `${getArmyListApiUrl(userId)}/${armyId}/units/${unitId}`;
    }
};



export const getArmyListHandler = async (username) => {
    try {
        const userId = await getUserIdByUsername(username);

        if (!userId) {
            console.log('User not found for the given username:', username);
            return [];
        }

        // console.log('User ID:', userId);

        const armies = await getArmyList(userId);

        // console.log('Armies:', armies);

        const armiesWithUnits = [];

        for (const army of armies) {
            const units = await getUnitsForArmy(userId, army.id, army.id);
            armiesWithUnits.push({ ...army, units });
        }

        // console.log('Armies with Units:', armiesWithUnits);

        return armiesWithUnits;
    } catch (error) {
        console.error('Error getting army list:', error);
        return [];
    }
};


export const getArmyList = async (userId) => {
    try {
        const resp = await fetch(getArmyListApiUrl(userId));
        if (!resp.ok) {
            throw new Error('Failed to fetch army list.');
        }
        const data = await resp.json();
        return data || [];
    } catch (error) {
        throw new Error('Error fetching army list: ' + error.message);
    }
};

export const getUnitsForArmy = async (userId, armyId, armyListId) => {
    // armyListId = armyId;
    try {
        const resp = await fetch(getUnitsApiUrl(userId, armyId, armyListId));
        console.log('userId, armyId, armyListId', userId, armyId, armyListId);
        if (!resp.ok) {
            throw new Error('Failed to fetch units for army.');
        }
        const data = await resp.json();
        console.log(data);
        return data || [];
    } catch (error) {
        throw new Error('Error fetching units for army: ' + error.message);
    }
};


// Create a new entity for the first unit and link it to the army-list
export const createInitialUnit = async (userId, armyId, transformedCardData) => {
    const initialUnitData = {
        name: transformedCardData.name,
        army: transformedCardData.army,
        category: transformedCardData.category,
        canBeHero: transformedCardData.canBeHero,
        numModels: transformedCardData.numModels,
        points: transformedCardData.points,
        movement: transformedCardData.movement,
        toughness: transformedCardData.toughness,
        save: transformedCardData.save,
        wounds: transformedCardData.wounds,
        leadership: transformedCardData.leadership,
        objectiveControl: transformedCardData.objectiveControl,
        defaultWeapon: transformedCardData.defaultWeapon,
        image: transformedCardData.image,
    }

    try {
        const response = await fetch(postUnitsApiUrl(userId, armyId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(initialUnitData),
        });

        if (!response.ok) {
            throw new Error('Failed to create initial unit.');
        }

        const createdData = await response.json();
        return createdData;
    } catch (error) {
        console.error('Error creating initial unit:', error);
        throw error;
    }
};

// Add a unit to an existing army's units array
export const addUnitToArmy = async (userId, armyId, armyListId, updatedArmyData) => {
    try {
        const response = await fetch(putUnitsApiUrl(userId, armyId, armyListId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedArmyData),
        });

        if (!response.ok) {
            throw new Error('Failed to add unit to army.');
        }

        const updatedData = await response.json();
        return updatedData;
    } catch (error) {
        console.error('Error adding unit to army:', error);
        throw error;
    }
};

export const deleteAllUnitsForArmyHandler = async (username, armyId, armyListId) => {
    try {
        const userId = await getUserIdByUsername(username);

        if (!userId) {
            console.log('User not found for the given username:', username);
            return;
        }
        const units = await getUnitsForArmy(userId, armyId, armyListId);

        await Promise.all(units.map(async (unit) => {
            await deleteUnitHandler(userId, armyId, unit.id);
        }));

        console.log('Chosen unit(s) for the army deleted successfully');
    } catch (error) {
        console.log('Error deleting all units for army:', error);
    }
};

export const deleteUnitHandler = async (userId, armyId, unitId) => {
    try {
        const apiUrl = deleteArmyUnitsApiUrl(userId, armyId, unitId);
        const resp = await fetch(apiUrl, {
            method: 'DELETE',
        });

        if (!resp.ok) {
            throw new Error('Failed to delete unit');
        }

        console.log('Deleted unit successfully');
    } catch (error) {
        console.error('Error deleting unit:', error);
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

        // Call the deleteArmy function with the obtained userId
        const data = await deleteArmy(userId, armyId);
        console.log('Deleted army:', data);
    } catch (error) {
        console.error('Error deleting army:', error);
    }
};

const deleteArmy = async (userId, armyId) => {
    try {
        const apiUrl = deleteArmyApiUrl(userId, armyId);
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

// //******* CRUD operations: get, add, update, delete ARMIES to mockapi *******//


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
        // console.log('Created army:', armyData, armyId);
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
            const resp = await fetch(getArmyListApiUrl(userId), {
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
            // console.log("Response from fetch:", data);
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


//**** operations to fetch data for army selection and utility functions ****//


// const factionDetachmentMap = {
//     "DetachmentA": "Space Marines",
//     "DetachmentB": "Orks",
//     "DetachmentC": "Dark Angels",
//     "DetachmentD": "Necrons",
// };

export const getFactions = async () => {
    try {
        const resp = await fetch(factionsApiUrl);
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



//********* INFORMATIONAL data only, to be used in navbar links as TABLES *********//
//******** Not implemented using these/data not fetching in component file ********//

export const getDetachments = async () => {
    try {
        const resp = await fetch(detachmentsApiUrl);
        const data = await resp.json();
        console.log("detachment data: ", data)
        return data;
    } catch (e) {
        console.log("Error fetching detachments: ", e);
        throw e;
    }
};

export const getFactionRules = async () => {
    try {
        const resp = await fetch(factionRulesApiUrl);
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
        const resp = await fetch(detachmentRulesApiUrl);
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
        const resp = await fetch(enhancementsApiUrl);
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
        const resp = await fetch(stratagemsApiUrl);
        const data = await resp.json();
        console.log("Stratagems data:", data);
        return data;
    } catch (e) {
        console.log("Error fetching stratagems: ", e);
        throw e;
    }
};

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

//*********** operations to add, edit, delete USER information ************//
//****************** not fully implemented at this time *******************//

export const createNewUser = async (username, password) => {
    try {
        const user = { username, password };
        const resp = await fetch(usersApiUrl, {
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
export const updateUser = async (userId, dataToUpdate) => {
    try {
        const resp = await fetch(`${usersApiUrl}/${userId}`, {
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
