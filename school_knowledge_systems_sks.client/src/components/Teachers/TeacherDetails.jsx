import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const TeacherDetails = ({ teacher, onClose }) => {
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (teacher && teacher.teacherID) {
            fetchTeacherDetails(teacher.teacherID);
        }
    }, [teacher]);

    const fetchTeacherDetails = async (teacherId) => {
        try {
            const response = await api.get(`Teachers/${teacherId}/WithSubjects`);
            setTeacherDetails(response.data);
        } catch (error) {
            console.error('Error fetching teacher details:', error);
            setError(error.message);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Teacher Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div>Error: {error}</div>}
                {teacherDetails && (
                    <div>
                        <p>Teacher ID: {teacherDetails.teacherID}</p>
                        <p>Teacher Name: {teacherDetails.teacherName}</p>
                        <p>Phone Number: {teacherDetails.phoneNumber}</p>
                        <p>Classes Per Week: {teacherDetails.teacherClassesPerWeek}</p>

                        {teacherDetails.taughtSubjects && teacherDetails.taughtSubjects.length > 0 && (
                            <div>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Taught Subjects
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <ul>
                                                    {teacherDetails.taughtSubjects.map(subject => (
                                                        <li key={subject.subjectID}>
                                                            <p>Subject ID: {subject.subjectID}</p>
                                                            <p>No. of Classes Per Week: {subject.noOfClassesPerWeek}</p>
                                                            <p>Level ID: {subject.levelID}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        )}
                    </div>
                )}
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
