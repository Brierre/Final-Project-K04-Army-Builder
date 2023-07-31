import React from "react";
import Button from 'react-bootstrap/Button';

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

export default DetachmentCard;
