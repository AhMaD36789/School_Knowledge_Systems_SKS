// TeacherUpdate.jsx
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const TeacherUpdate = ({ teacher, onUpdate, onClose, updateTeachers }) => {
    const [updatedTeacher, setUpdatedTeacher] = useState({ ...teacher });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await api.put(`Teachers/${teacher.teacherID}`, updatedTeacher);

            onUpdate(response.data);

            console.log('Teacher updated successfully:', response.data);

            onClose();

            // Update the teachers in TeacherList without a page refresh
            updateTeachers((prevTeachers) =>
                prevTeachers.map((t) => (t.teacherID === response.data.teacherID ? response.data : t))
            );
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="teacherName">
                        <Form.Label>Teacher Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="teacherName"
                            value={updatedTeacher.teacherName}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control
                            type="number"
                            name="phoneNumber"
                            value={updatedTeacher.phoneNumber}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="teacherClassesPerWeek">
                        <Form.Label>Classes Per Week:</Form.Label>
                        <Form.Control
                            type="number"
                            name="teacherClassesPerWeek"
                            value={updatedTeacher.teacherClassesPerWeek}
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

export default TeacherUpdate;
