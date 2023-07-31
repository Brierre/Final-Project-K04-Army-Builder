import React from 'react';
import { Link } from 'react-router-dom';
import DetachmentCardList from './DetachmentCardList';

const DetachmentSelector = () => {
    return (
        <>
            <h3>Choose a detachment:</h3>
            <DetachmentCardList />
            <div>
                <Link to="/faction-selector">
                    <button>Redo Selection</button>
                </Link>
                <Link to="/unit-selector">
                    <button>Confirm Selection</button>
                </Link>
            </div>
        </>
    );
};

export default DetachmentSelector;