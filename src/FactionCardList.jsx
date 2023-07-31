import React, { useEffect, useState } from 'react';
import FactionCard from './FactionCard';
import { getFactions, createPlayerArmy } from './rest/api';


const FactionCardList = ({ onSelectFaction, onSelectDetachment, selectedPoints }) => {
    const [factionsData, setFactionsData] = useState([]);
    const [selectedFaction, setSelectedFaction] = useState(null);
    const [selectedDetachment, setSelectedDetachment] = useState(null);
    
    useEffect(() => {
        const fetchFactionsData = async () => {
            try {
                const data = await getFactions();
                setFactionsData(data);
                if (data.length > 0) {
                    setSelectedFaction(data[0]);
                }
            } catch(e) {
                console.log('Error fetching faction data: ', e);
            }
        };

        fetchFactionsData();
    }, []);

    const handleSelectFaction = async (factionData) => {
        setSelectedFaction(factionData);  
        onSelectFaction({ faction: factionData, points: selectedPoints });          
    };

    const handleSelectDetachment = async (detachmentData) => {
        setSelectedDetachment(detachmentData);
        onSelectDetachment({ detachment: detachmentData, points: selectedPoints });
    };

    useEffect(() => {
        if (selectedFaction && selectedDetachment) {
            const createArmy = async () => {
                try {
                    await createPlayerArmy(selectedFaction, selectedDetachment);
                } catch(e) {
                    console.log('Error adding faction to player army list: ', e);
                }
            };
            createArmy();
        }
    }, [selectedFaction, selectedDetachment]);

    return (
        <div>
            {factionsData.map((faction) => (
                <FactionCard
                    key={faction.id}
                    faction={faction}
                    onSelectFaction={handleSelectFaction}
                    onselectDetachment={handleSelectDetachment}
                    selected={selectedFaction && selectedFaction.id === faction.id}
                />
            ))}
        </div>
    );
};

export default FactionCardList;
