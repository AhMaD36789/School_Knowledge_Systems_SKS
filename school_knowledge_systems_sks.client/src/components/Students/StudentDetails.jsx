// StudentDetails.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StudentDetails = ({ student, onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Name: {student.name}</p>
                <p>Father's Phone Number: {student.fatherPhoneNumber}</p>
                <p>Section ID: {student.sectionID}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentDetails;
