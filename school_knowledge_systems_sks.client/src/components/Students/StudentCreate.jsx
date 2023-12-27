// StudentCreate.jsx
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const StudentCreate = ({ onCreate, onClose }) => {
    const [newStudent, setNewStudent] = useState({
        name: '',
        fatherPhoneNumber: 0,
        sectionID: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('Students', newStudent);

            // Instead of reloading the entire page, update the StudentList data
            onCreate(response.data);

            console.log('Student created successfully:', response.data);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={newStudent.name} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="fatherPhoneNumber">
                        <Form.Label>Father's Phone Number:</Form.Label>
                        <Form.Control type="text" name="fatherPhoneNumber" value={newStudent.fatherPhoneNumber} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="sectionID">
                        <Form.Label>Section ID:</Form.Label>
                        <Form.Control type="text" name="sectionID" value={newStudent.sectionID} autoComplete="off" onChange={handleInputChange} />
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

export default StudentCreate;
