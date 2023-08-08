import React, { useState } from 'react';
import FactionCard from './FactionCard';

const FactionCardList = ({ factionsData, onSelectFaction }) => {

    const handleSelectFaction = (faction) => {
        onSelectFaction(faction);
    };
    
    return (
        <div>
            <h3>Choose a Faction</h3>
                {factionsData && factionsData.length > 0 ? (
                    factionsData.map((faction) => (
                        <FactionCard
                            key={faction.id}
                            faction={faction}
                            onSelectFaction={handleSelectFaction} // Use the local handler
                        />
                    ))
                ) : (
                    <p>Loading factions...</p>
            )}
        </div>
    );
};

export default FactionCardList;

