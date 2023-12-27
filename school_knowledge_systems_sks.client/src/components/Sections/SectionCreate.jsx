import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const SectionCreate = ({ onCreate, onClose }) => {
    const [newSection, setNewSection] = useState({
        sectionID: '', // Include SectionID in the state
        LevelID: '',
        studentCount: 0,
        noOfClassesPerWeek: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSection((prevSection) => ({
            ...prevSection,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('Sections', newSection);

            // Instead of reloading the entire page, update the SectionList data
            onCreate(response.data);

            console.log('Section created successfully:', response.data);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error creating section:', error);
            console.log('Error response:', error.response); 
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="sectionID">
                        <Form.Label>Section ID:</Form.Label>
                        <Form.Control type="text" name="sectionID" value={newSection.sectionID} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="LevelID">
                        <Form.Label>Class ID:</Form.Label>
                        <Form.Control type="text" name="LevelID" value={newSection.LevelID} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="studentCount">
                        <Form.Label>Student Count:</Form.Label>
                        <Form.Control type="number" name="studentCount" value={newSection.studentCount} autoComplete="off" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="noOfClassesPerWeek">
                        <Form.Label>Classes Per Week:</Form.Label>
                        <Form.Control type="number" name="noOfClassesPerWeek" value={newSection.noOfClassesPerWeek} autoComplete="off" onChange={handleInputChange} />
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

export default SectionCreate;
