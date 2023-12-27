// TeacherCreate.jsx
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const TeacherCreate = ({ onCreate, onClose }) => {
    const [newTeacher, setNewTeacher] = useState({
        teacherName: '',
        phoneNumber: 0,
        teacherClassesPerWeek: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('Teachers', newTeacher);

            // Instead of reloading the entire page, update the TeacherList data
            onCreate(response.data);

            console.log('Teacher created successfully:', response.data);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error creating teacher:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="teacherName">
                        <Form.Label>Teacher Name:</Form.Label>
                        <Form.Control type="text" name="teacherName" value={newTeacher.teacherName} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type="number" name="phoneNumber" value={newTeacher.phoneNumber} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="teacherClassesPerWeek">
                        <Form.Label>Classes Per Week:</Form.Label>
                        <Form.Control type="number" name="teacherClassesPerWeek" value={newTeacher.teacherClassesPerWeek} autoComplete="off" onChange={handleInputChange} />
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

export default TeacherCreate;
