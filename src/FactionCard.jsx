import React from "react";
import Button from 'react-bootstrap/Button';

function FactionCard({ faction, onSelectFaction, selected }) {
    const handleSelectFaction = () => {
        onSelectFaction(faction);
    };

    return (
        <Button onClick={handleSelectFaction} className={selected ? '' : 'hidden-faction'}>
            <img src={faction.logo} alt={faction.name} />
            <div>
                <h4>{faction.name}</h4>
                <p>{faction.description}</p>
            </div>
        </Button>
    );
}

export default FactionCard;