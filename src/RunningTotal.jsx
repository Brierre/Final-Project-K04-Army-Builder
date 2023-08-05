import React from 'react';

const RunningTotal = ({ selectedPoints }) => {
    return (
        <div className="running-total">
            <p>Selected points: {selectedPoints}</p>
        </div>
    );
};

export default RunningTotal;