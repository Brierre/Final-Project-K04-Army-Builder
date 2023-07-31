import React from 'react';
import { Link } from 'react-router-dom';
import UnitCardList from './UnitCardList';

const UnitSelector = () => {
    return (
        <>
            <h3>Choose a unit:</h3>
            <UnitCardList />
            <div>
                <Link to="/detachment-selector">
                    <button>Redo Selection</button>
                </Link>
                <Link to="/my-army">
                    <button>Confirm Selection</button>
                </Link>
            </div>
        </>
    );
};

export default UnitSelector;