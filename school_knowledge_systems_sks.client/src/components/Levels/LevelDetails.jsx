import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LevelDetails = ({ level, onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Level Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Class ID: {level.levelID}</p>
                <p>Students: {level.studentsCount}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LevelDetails;
