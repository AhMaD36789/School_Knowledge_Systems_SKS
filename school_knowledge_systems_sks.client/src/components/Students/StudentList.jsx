// StudentList.jsx
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import api from '../Api/api';
import StudentDetails from './StudentDetails';
import StudentDelete from './StudentDelete';
import StudentUpdate from './StudentUpdate';
import StudentCreate from './StudentCreate';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [action, setAction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('Students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    const handleDetails = (student) => {
        setSelectedStudent(student);
        setAction('details');
    };

    const handleUpdate = (student) => {
        setSelectedStudent(student);
        setAction('update');
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        setAction('delete');
    };

    const handleCreate = () => {
        setAction('create');
    };

    const handleUpdateSuccess = async (updatedStudent) => {
        setStudents((prevStudents) =>
            prevStudents.map((s) => (s.name === updatedStudent.name ? updatedStudent : s))
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
        setSelectedStudent(null);
        setAction(null);
    };

    const renderActionComponent = () => {
        switch (action) {
            case 'details':
                return <StudentDetails student={selectedStudent} onClose={handleClose} />;
            case 'update':
                return (
                    <StudentUpdate
                        student={selectedStudent}
                        onUpdate={handleUpdateSuccess}
                        onClose={handleClose}
                        updateStudents={setStudents}
                    />
                );
            case 'delete':
                return (
                    <StudentDelete student={selectedStudent} onDelete={handleDeleteSuccess} onClose={handleClose} />
                );
            case 'create':
                return <StudentCreate onCreate={handleCreateSuccess} onClose={handleClose} />;
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
                    <h1>Students</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleCreate} variant="primary">
                        Create New Student
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Father's Phone Number</th>
                        <th>Section ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.name}>
                            <td>{student.name}</td>
                            <td>{student.fatherPhoneNumber}</td>
                            <td>{student.sectionID}</td>
                            <td>
                                <Button onClick={() => handleDetails(student)} variant="info" size="sm" className="me-2">
                                    Details
                                </Button>
                                <Button onClick={() => handleUpdate(student)} variant="warning" size="sm" className="me-2">
                                    Update
                                </Button>
                                <Button onClick={() => handleDelete(student)} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {action === 'create' && <StudentCreate onCreate={handleCreateSuccess} onClose={handleClose} />}

            {selectedStudent && renderActionComponent()}
        </Container>
    );
};

export default StudentList;
