// SubjectDetails.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SubjectDetails = ({ subject, onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Subject Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Subject ID: {subject.subjectID}</p>
                <p>No. of Classes Per Week: {subject.noOfClassesPerWeek}</p>
                <p>Level ID: {subject.levelID}</p>
                <p>Teacher ID: {subject.teacherID}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SubjectDetails;
