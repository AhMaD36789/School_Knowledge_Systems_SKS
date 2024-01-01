import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

const LevelDetails = ({ level, onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Level Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">Class ID: {level.levelID}</Card.Title>
                        <Card.Text className="text-center">Students: {level.studentsCount}</Card.Text>
                    </Card.Body>
                </Card>
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
