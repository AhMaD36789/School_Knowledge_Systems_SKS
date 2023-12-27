import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const SectionUpdate = ({ section, onUpdate, onClose, updateSections }) => {
    const [updatedSection, setUpdatedSection] = useState({ ...section });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSection((prevSection) => ({
            ...prevSection,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await api.put(`Sections/${section.sectionID}`, updatedSection);

            onUpdate(response.data);

            console.log('Section updated successfully:', response.data);

            onClose();

            // Update the sections in SectionList without a page refresh
            updateSections((prevSections) =>
                prevSections.map((s) => (s.sectionID === response.data.sectionID ? response.data : s))
            );
        } catch (error) {
            console.error('Error updating section:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="studentCount">
                        <Form.Label>Student Count:</Form.Label>
                        <Form.Control
                            type="number"
                            name="studentCount"
                            value={updatedSection.studentCount}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="noOfClassesPerWeek">
                        <Form.Label>Classes Per Week:</Form.Label>
                        <Form.Control
                            type="number"
                            name="noOfClassesPerWeek"
                            value={updatedSection.noOfClassesPerWeek}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SectionUpdate;
