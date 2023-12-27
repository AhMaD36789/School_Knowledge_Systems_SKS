import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axiosInstance from '../Api/api'; // Update the import path

const LevelCreate = ({ onCreate, onClose }) => {
    const [newLevel, setNewLevel] = useState({
        levelID: '',
        studentsCount: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLevel((prevLevel) => ({
            ...prevLevel,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axiosInstance.post('Levels', newLevel);

            onCreate(newLevel);

            console.log('Level created successfully:', response.data);
        } catch (error) {
            console.error('Error creating level:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Level</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="levelID">
                        <Form.Label>Class ID:</Form.Label>
                        <Form.Control type="text" name="levelID" value={newLevel.levelID} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="studentsCount">
                        <Form.Label>Students:</Form.Label>
                        <Form.Control type="number" name="studentsCount" value={newLevel.studentsCount} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LevelCreate;
