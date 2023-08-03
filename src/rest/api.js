import axios from "axios";


const factionRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/army-rules';
const detachmentsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/detachments';
const detachmentRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/detachment-rules';
const enhancementsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/enhancements';
const factionsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/factions';
const playerArmyListApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/player-army-list';
const stratagemsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/stratagems';
const mockapiUnitsJson = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/units';
const usersApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users';


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
        return data;
    } catch (error) {
        console.error('Error fetching units data:', error);
        return [];
    }
};

//******* CRUD operations: get, add, update, delete PLAYER ARMIES to mockapi *******//

export const getPlayerArmy = async () => {
    try {
        const resp = await fetch(`${playerArmyListApiUrl}`);
        const data = await resp.json();
        return data;
    } catch (e) {
        console.log("Error fetching player army: ", e);
        throw e;
    }
};

export const deletePlayerArmy = async (id) => {
    try {
        const resp = await fetch(`${playerArmyListApiUrl}/${id}`, {
            method: 'DELETE',
        });
        return await resp.json();
    } catch (e) {
        console.log('could not delete army: ', e);
        throw e;
    }
};

export const updatePlayerArmy = async (armyId, dataToUpdate) => {
    try {
        const resp = await fetch(`${playerArmyListApiUrl}/${armyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        });
        return await resp.json();
    } catch (e) {
        console.log('could not update army: ', e);
        throw e;
    }
}


const factionDetachmentMap = {
    "DetachmentA": "Space Marines",
    "DetachmentB": "Orks",
    "DetachmentC": "Dark Angels",
    "DetachmentD": "Necrons",
};

export const createPlayerArmy = async (selectedFaction, selectedPoints, userId) => {
    const detachmentName = factionDetachmentMap[selectedFaction.name] || '';

    const userArmyData = {
        factionName: selectedFaction.name,
        detachmentName,
        startingPointsValue: selectedPoints,
        units: [],
        userId,
    };

    try {
        const resp = await fetch(playerArmyListApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userArmyData),
        });

        if (!resp.ok) {
            throw new Error("Failed to post user army.");
        }

        const data = await resp.json();
        return data;
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

export const updateUser = async (userId, dataToUpdate) => {
    try {
        const resp = await fetch(`${usersApiUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        });
        return await resp.json();
    } catch (e) {
        console.log('could not update army: ', e);
        throw e;
    }
}

export const deleteUser = async (id) => {
    try {
        const resp = await fetch(`${usersApiUrl}/${id}`, {
            method: 'DELETE',
        });
        return await resp.json();
    } catch (e) {
        console.log('could not delete user: ', e);
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