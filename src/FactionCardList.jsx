import React, { useEffect, useState } from 'react';
import FactionCard from './FactionCard';
import { getFactions, createPlayerArmy } from './rest/api';

const FactionCardList = ({ factionsData, onSelectFaction, selectedPoints }) => {
    const [isFactionSelected, setIsFactionSelected] = useState(false);

    const handleSelectFaction = async (factionsData) => { 
        setIsFactionSelected(true);
        onSelectFaction({ faction: factionsData, points: selectedPoints });          
    };

    const handleStartOver = () => {
        setIsFactionSelected(false);
    }
    
    return (
        <div>
            <h3>Choose a Faction</h3>
            {isFactionSelected ? (
                <>
                <FactionCard
                    onSelectFaction={handleSelectFaction}
                    selected={true} 
                />
                <div>
                    <button onClick={handleStartOver}>Start Over</button>
                </div>
                </>
            ) : (
                factionsData && factionsData.length > 0 ? (
                factionsData.map((faction) => (
                    <FactionCard
                        key={faction.id}
                        faction={faction}
                        onSelectFaction={handleSelectFaction}
                    />
                ))
                ) : (
                    <p>Loading factions...</p>
                )
            )}
        </div>
    );
};

export default FactionCardList;
