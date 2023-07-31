import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PointsSelector from './PointsSelector';
import FactionCardList from './FactionCardList';


const FactionSelector = () => {
    const [selectedFaction, setSelectedFaction] = useState(null);
    const [selectedDetachment, setSelectedDetachment] = useState(null);
    const [selectedPoints, setSelectedPoints] = useState('');

    const handleSelectFaction = (factionData) => {
        setSelectedFaction(factionData);
    };

    const handleSelectDetachment = (detachmentData) => {
        setSelectedDetachment(detachmentData);
    };

    const handleSelectPoints = (points) => {
        setSelectedPoints(points);
    };
    console.log(selectedPoints);
    return (
        <>
            {selectedPoints === '' ? (
                // Render PointsSelector if points are not selected yet
                <PointsSelector onSelectPoints={handleSelectPoints} />
            ) : selectedFaction && selectedDetachment ? (
                <FactionCardList
                    selectedFaction={selectedFaction}
                    selectedDetachment={selectedDetachment}
                    selectedPoints={selectedPoints}
                />
            ) : (
                <FactionCardList
                    onSelectFaction={handleSelectFaction}
                    onSelectDetachment={handleSelectDetachment}
                />
            )}
            <div>
                {selectedPoints !== '' && (
                    <>
                        <Link to="/points-selector">
                            <button>Start Over</button>
                        </Link>
                        <Link to="/unit-selector">
                            <button>Confirm Selection</button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default FactionSelector;