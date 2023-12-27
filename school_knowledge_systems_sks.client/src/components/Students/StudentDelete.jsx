// StudentDelete.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../Api/api';

const StudentDelete = ({ student, onDelete, onClose }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`Students/${student.name}`);
            onDelete();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this student?</p>
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

export default StudentDelete;
