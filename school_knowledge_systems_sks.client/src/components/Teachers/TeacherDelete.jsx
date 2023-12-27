// TeacherDelete.jsx
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const TeacherDelete = ({ teacher, onDelete, onClose }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`Teachers/${teacher.teacherID}`);
            onDelete();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this teacher?</p>
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

export default TeacherDelete;
