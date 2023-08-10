import React from "react";
import Button from 'react-bootstrap/Button';

function FactionCard({ faction, onSelectFaction, selected }) {
    const handleSelectFaction = () => {
        onSelectFaction(faction);
    };

    return (
        <Button onClick={handleSelectFaction} className={`card d-flex flex-column bg-secondary h-100 rounded border border-light ${selected ? '' : 'hidden-faction'}`}
        style={{ width: '18rem' }}>
            <img src={faction.logo} alt={faction.name} />
            <div>
                <h4>{faction.name}</h4>
                <p>{faction.description}</p>
            </div>
        </Button>
    );
}

export default FactionCard;