// SubjectList.jsx
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import api from '../Api/api';
import SubjectDetails from './SubjectDetails';
import SubjectDelete from './SubjectDelete';
import SubjectUpdate from './SubjectUpdate';
import SubjectCreate from './SubjectCreate';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [action, setAction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('Subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    const handleDetails = (subject) => {
        setSelectedSubject(subject);
        setAction('details');
    };

    const handleUpdate = (subject) => {
        setSelectedSubject(subject);
        setAction('update');
    };

    const handleDelete = (subject) => {
        setSelectedSubject(subject);
        setAction('delete');
    };

    const handleCreate = () => {
        setAction('create');
    };

    const handleUpdateSuccess = async (updatedSubject) => {
        setSubjects((prevSubjects) =>
            prevSubjects.map((s) => (s.subjectID === updatedSubject.subjectID ? updatedSubject : s))
        );

        handleClose();
    };

    const handleDeleteSuccess = async () => {
        await fetchData();
        handleClose();
    };

    const handleCreateSuccess = async () => {
        await fetchData();
        handleClose();
    };

    const handleClose = () => {
        setSelectedSubject(null);
        setAction(null);
    };

    const renderActionComponent = () => {
        switch (action) {
            case 'details':
                return <SubjectDetails subject={selectedSubject} onClose={handleClose} />;
            case 'update':
                return (
                    <SubjectUpdate
                        subject={selectedSubject}
                        onUpdate={handleUpdateSuccess}
                        onClose={handleClose}
                        updateSubjects={setSubjects}
                    />
                );
            case 'delete':
                return (
                    <SubjectDelete subject={selectedSubject} onDelete={handleDeleteSuccess} onClose={handleClose} />
                );
            case 'create':
                return <SubjectCreate onCreate={handleCreateSuccess} onClose={handleClose} />;
            default:
                return null;
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <h1>Subjects</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleCreate} variant="primary">
                        Create New Subject
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Subject ID</th>
                        <th>No. of Classes Per Week</th>
                        <th>Level ID</th>
                        <th>Teacher ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.subjectID}>
                            <td>{subject.subjectID}</td>
                            <td>{subject.noOfClassesPerWeek}</td>
                            <td>{subject.levelID}</td>
                            <td>{subject.teacherID}</td>
                            <td>
                                <Button onClick={() => handleDetails(subject)} variant="info" size="sm" className="me-2">
                                    Details
                                </Button>
                                <Button onClick={() => handleUpdate(subject)} variant="warning" size="sm" className="me-2">
                                    Update
                                </Button>
                                <Button onClick={() => handleDelete(subject)} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {action === 'create' && <SubjectCreate onCreate={handleCreateSuccess} onClose={handleClose} />}

            {selectedSubject && renderActionComponent()}
        </Container>
    );
};

export default SubjectList;
