const armyRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/army-rules';
const detachmentsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/detachments';
const detachmentRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/army-rules';
const enhancementsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/enhancements';
const factionsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/factions';
const playerArmyListApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/player-army-list';
const stratagemsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/enhancements';

export const getArmyRules = async () => {
    try {
        const resp = await fetch(`${armyRulesApiUrl}`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching army rules: ", e);
        throw e;
    }
};

export const getDetachments = async () => {
    try {
        const resp = await fetch(`${detachmentsApiUrl}`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching detachments: ", e);
        throw e;
    }
};

export const getDetachmentRules = async () => {
    try {
        const resp = await fetch(`${detachmentRulesApiUrl}`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching detachment rules: ", e);
        throw e;
    }
};

export const getEnhancements = async () => {
    try {
        const resp = await fetch(`${enhancementsApiUrl}`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching enhancements: ", e);
        throw e;
    }
};

export const getFactions = async () => {
    try {
        const resp = await fetch(`${factionsApiUrl}`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching factions: ", e);
        throw e;
    }
};

export const getStratagems = async () => {
    try {
        const resp = await fetch(`${stratagemsApiUrl}/`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching stratagems: ", e);
        throw e;
    }
};

export const getPlayerArmy = async () => {
    try {
        const resp = await fetch(`${playerArmyListApiUrl}`);
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log("Error fetching player army: ", e);
        throw e;
    }
};

export const createPlayerArmy = async (faction, detachment) => {
    try {
        const army = { faction, detachment };
        const resp = await fetch(`${playerArmyListApiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(army)
        });
        return await resp.json();
    } catch(e) {
        console.log('could not create army: ', e);
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
    } catch(e) {
        console.log('could not update army: ', e);
        throw e;
    }
}

export const deletePlayerArmy = async (id) => {
    try {
        const resp = await fetch(`${playerArmyListApiUrl}/${id}`, {
            method: 'DELETE',
        });
        return await resp.json();
    } catch(e) {
        console.log('could not delete army: ', e);
        throw e;
    }
};


