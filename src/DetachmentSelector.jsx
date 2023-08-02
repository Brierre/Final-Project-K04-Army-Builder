import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getDetachments } from './rest/api.js';

const DetachmentCard = ({ detachment, onSelectDetachment }) => {
    const handleSelectDetachment = () => {
        onSelectDetachment(detachment);
    };

    return (
        <Button onClick={handleSelectDetachment}>
            <div>
                <h4>{detachment.name}</h4>
            </div>
        </Button>
    );
};

const DetachmentCardList = ({ detachments, onSelectDetachment }) => {
    return (
        <>
            {detachments.length > 0 ? (
                detachments.map((detachment) => (
                    <DetachmentCard
                        key={detachment.id}
                        detachment={detachment}
                        onSelectDetachment={onSelectDetachment}
                    />
                ))
            ) : (
                <p>Loading detachments...</p>
            )}
        </>
    );
};

const DetachmentSelector = ({ detachments, onSelectDetachment }) => {
    return (
        <>
            <h3>Choose a detachment:</h3>
            <DetachmentCardList detachments={detachments} onSelectDetachment={onSelectDetachment} />
        </>
    );
};

export default DetachmentSelector;