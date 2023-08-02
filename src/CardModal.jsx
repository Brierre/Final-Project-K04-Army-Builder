import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CardModal = ({ cardData, onClose, onSelectCard }) => {
    const { name, description } = cardData;

    const handleSelectCard = () => {
        onSelectCard(cardData);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{description}</p>
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



