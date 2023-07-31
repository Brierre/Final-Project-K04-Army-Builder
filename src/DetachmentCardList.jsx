import React, { useEffect, useState } from 'react';
import DetachmentCard from './DetachmentCard';
import { getDetachments } from './rest/api.js';
import { updatePlayerArmy } from './rest/api.js';

const DetachmentCardList = ({ playerArmy, onSelectDetachment, selectedPoints }) => {
    const [detachments, setDetachments] = useState([]);

    useEffect(() => {
        const fetchDetachments = async () => {
            try {
                const response = await getDetachments();
                setDetachments(response.data);
            } catch (e) {
                console.log("Error fetching detachment data:", e);
            }
        };

        fetchDetachments();
    }, []);

    const handleSelectDetachment = async (selectedDetachment) => {
        try {
            if (!playerArmy) {
                console.log('Player army data not found.');
                return;
            }
            onSelectDetachment({ detachment: selectedDetachment, points: selectedPoints });

            const updatedArmy = {
                ...playerArmy,
                detachment: selectedDetachment
            };

            await updatePlayerArmy(playerArmy.id, updatedArmy);
            setDetachments([selectedDetachment]);

        } catch (e) {
            console.log('Error adding detachment to player army list: ', e);
        }
    };

    return (
        <>
            {detachments.length > 0 ? (
                detachments.map((detachment) => (
                <DetachmentCard 
                    key={detachment.id} 
                    detachment={detachment}
                    onSelectDetachment={handleSelectDetachment} />
            ))
        ) : (
            <p> Loading detachments...</p>
        )}
        </>
    );
};

export default DetachmentCardList;