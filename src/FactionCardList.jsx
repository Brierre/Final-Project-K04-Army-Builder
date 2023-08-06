import React, { useState } from 'react';
import FactionCard from './FactionCard';

const FactionCardList = ({ factionsData, onSelectFaction, selectedPoints }) => {
    const [selectedFaction, setSelectedFaction] = useState(null);

    const handleSelectFaction = (faction) => {
        setSelectedFaction(faction);
    };

    const handleStartOver = () => {
        setSelectedFaction(null);
    };
    
    return (
        <div>
            <h3>Choose a Faction</h3>
            {selectedFaction ? (
                <>
                    <FactionCard
                        faction={selectedFaction}
                        onSelectFaction={onSelectFaction}
                        selected={true} 
                    />
                    <div>
                        <button onClick={handleStartOver}>Choose a different faction</button>
                
                        <button onClick={() => onSelectFaction(selectedFaction)}>Confirm selection</button>
                    </div>

                </>
            ) : (
                factionsData && factionsData.length > 0 ? (
                    factionsData.map((faction) => (
                        <FactionCard
                            key={faction.id}
                            faction={faction}
                            onSelectFaction={handleSelectFaction} // Use the local handler
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

