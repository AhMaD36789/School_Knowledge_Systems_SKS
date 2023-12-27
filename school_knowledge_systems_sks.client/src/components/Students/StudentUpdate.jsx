// StudentUpdate.jsx
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const StudentUpdate = ({ student, onUpdate, onClose, updateStudents }) => {
    const [updatedStudent, setUpdatedStudent] = useState({ ...student });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await api.put(`Students/${student.name}`, updatedStudent);

            onUpdate(response.data);

            console.log('Student updated successfully:', response.data);

            onClose();

            // Update the students in StudentList without a page refresh
            updateStudents((prevStudents) =>
                prevStudents.map((s) => (s.name === response.data.name ? response.data : s))
            );
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="fatherPhoneNumber">
                        <Form.Label>Father's Phone Number:</Form.Label>
                        <Form.Control
                            type="text"
                            name="fatherPhoneNumber"
                            value={updatedStudent.fatherPhoneNumber}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="sectionID">
                        <Form.Label>Section ID:</Form.Label>
                        <Form.Control
                            type="text"
                            name="sectionID"
                            value={updatedStudent.sectionID}
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

export default StudentUpdate;
