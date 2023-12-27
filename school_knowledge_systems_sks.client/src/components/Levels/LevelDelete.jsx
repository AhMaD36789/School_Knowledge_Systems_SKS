import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const LevelDelete = ({ level, onDelete, onClose }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`Levels/${level.levelID}`);
            onDelete(); // Notify the parent component about a successful delete
        } catch (error) {
            console.error('Error deleting level:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Level</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this level?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LevelDelete;
