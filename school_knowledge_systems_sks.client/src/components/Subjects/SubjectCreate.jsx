// SubjectCreate.jsx
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const SubjectCreate = ({ onCreate, onClose }) => {
    const [newSubject, setNewSubject] = useState({
        subjectID: '',
        noOfClassesPerWeek: 0,
        levelID: '',
        teacherID: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('Subjects', newSubject);

            // Instead of reloading the entire page, update the SubjectList data
            onCreate(response.data);

            console.log('Subject created successfully:', response.data);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error creating subject:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="subjectID">
                        <Form.Label>Subject ID:</Form.Label>
                        <Form.Control type="text" name="subjectID" value={newSubject.subjectID} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="noOfClassesPerWeek">
                        <Form.Label>No. of Classes Per Week:</Form.Label>
                        <Form.Control type="number" name="noOfClassesPerWeek" value={newSubject.noOfClassesPerWeek} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="levelID">
                        <Form.Label>Level ID:</Form.Label>
                        <Form.Control type="text" name="levelID" value={newSubject.levelID} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="teacherID">
                        <Form.Label>Teacher ID:</Form.Label>
                        <Form.Control type="number" name="teacherID" value={newSubject.teacherID} autoComplete="off" onChange={handleInputChange} />
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

export default SubjectCreate;
