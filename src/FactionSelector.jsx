import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FactionCardList from './FactionCardList';
import CardModal from './CardModal';

const FactionSelector = ({ onSelectFaction }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleShowModal = (cardData) => {
        setSelectedCard(cardData);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
    };

    const handleSelectCard = (cardData) => {
        if (cardData.type === 'faction') {
            onSelectFaction(cardData);
        }
        handleCloseModal();
    };

    const handleSelectFactionInternal = (factionsData) => {
        onSelectFaction(factionsData);
        console.log('Selected Faction: ', factionsData);
    };

    return (
        <>
            <FactionCardList
                onSelectFaction={handleSelectFactionInternal}
            />
            {modalShow && (
                <CardModal cardData={selectedCard} onClose={handleCloseModal} onSelectCard={handleSelectCard} />
            )}
        </>
    );
};

export default FactionSelector;
