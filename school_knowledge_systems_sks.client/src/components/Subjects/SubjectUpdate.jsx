// SubjectUpdate.jsx
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const SubjectUpdate = ({ subject, onUpdate, onClose, updateSubjects }) => {
    const [updatedSubject, setUpdatedSubject] = useState({ ...subject });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await api.put(`Subjects/${subject.subjectID}`, updatedSubject);

            onUpdate(response.data);

            console.log('Subject updated successfully:', response.data);

            onClose();

            // Update the subjects in SubjectList without a page refresh
            updateSubjects((prevSubjects) =>
                prevSubjects.map((s) => (s.subjectID === response.data.subjectID ? response.data : s))
            );
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="noOfClassesPerWeek">
                        <Form.Label>No. of Classes Per Week:</Form.Label>
                        <Form.Control
                            type="number"
                            name="noOfClassesPerWeek"
                            value={updatedSubject.noOfClassesPerWeek}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="levelID">
                        <Form.Label>Level ID:</Form.Label>
                        <Form.Control
                            type="text"
                            name="levelID"
                            value={updatedSubject.levelID}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="teacherID">
                        <Form.Label>Teacher ID:</Form.Label>
                        <Form.Control
                            type="number"
                            name="teacherID"
                            value={updatedSubject.teacherID}
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

export default SubjectUpdate;
