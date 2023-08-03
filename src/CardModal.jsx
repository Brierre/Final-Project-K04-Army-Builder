import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CardModal = ({ cardData, show, onClose, onSelectCard }) => {
    const { title, properties } = cardData;

    const handleSelectCard = () => {
        onSelectCard(cardData);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.entries(properties).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value}
                    </p>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Go Back to List
                </Button>
                <Button variant="primary" onClick={handleSelectCard}>
                    Select This Card
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardModal;



