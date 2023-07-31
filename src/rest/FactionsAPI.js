const factionsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/factions';

class FactionsAPI {
    get = async () => {
        try {
            const response = await fetch(factionsApiUrl);
            const data = await response.json();
            console.log(data);
            return data;
        } catch(e) {
            console.log("Error fetching data: ", e);
            throw e;
        }
    }        
}

export default FactionsAPI;



