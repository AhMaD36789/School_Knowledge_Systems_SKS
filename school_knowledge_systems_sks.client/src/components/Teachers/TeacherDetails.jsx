// TeacherDetails.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TeacherDetails = ({ teacher, onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Teacher Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Teacher ID: {teacher.teacherID}</p>
                <p>Teacher Name: {teacher.teacherName}</p>
                <p>Phone Number: {teacher.phoneNumber}</p>
                <p>Classes Per Week: {teacher.teacherClassesPerWeek}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TeacherDetails;
