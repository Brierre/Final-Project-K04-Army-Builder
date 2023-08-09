import React from 'react';
import { calculateTotalPoints } from './utils';

const RunningTotal = ({ selectedPoints, armyUnits }) => {
    const totalPoints = calculateTotalPoints(armyUnits);
    const remainingPoints = selectedPoints - totalPoints;
// console.log('total points: ', totalPoints);
    return (
        <div className="running-total">
            <p>You have {remainingPoints} points left to spend.</p>
        </div>
    );
};

export default RunningTotal;