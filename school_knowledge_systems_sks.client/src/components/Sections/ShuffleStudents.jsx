import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const ShuffleStudents = ({ onShuffleSuccess, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleShuffle = async () => {
        try {
            setLoading(true);
            await api.get('Sections/ShuffleAndDistribute');
            await onShuffleSuccess(); // Refresh data in the parent component
            onClose(); // Close the modal or handle as needed
        } catch (error) {
            console.error('Error shuffling and distributing:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shuffle and Distribute Students</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to shuffle and distribute students?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleShuffle} disabled={loading}>
                    {loading ? 'Shuffling...' : 'Shuffle Students'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShuffleStudents;
