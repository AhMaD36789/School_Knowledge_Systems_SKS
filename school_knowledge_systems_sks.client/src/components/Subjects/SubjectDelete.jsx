// SubjectDelete.jsx
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const SubjectDelete = ({ subject, onDelete, onClose }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`Subjects/${subject.subjectID}`);
            onDelete();
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this subject?</p>
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

export default SubjectDelete;
