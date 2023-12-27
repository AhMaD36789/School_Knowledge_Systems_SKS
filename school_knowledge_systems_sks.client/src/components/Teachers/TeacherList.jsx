// TeacherList.jsx
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import api from '../Api/api';
import TeacherDetails from './TeacherDetails';
import TeacherDelete from './TeacherDelete';
import TeacherUpdate from './TeacherUpdate';
import TeacherCreate from './TeacherCreate';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [action, setAction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('Teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    const handleDetails = (teacher) => {
        setSelectedTeacher(teacher);
        setAction('details');
    };

    const handleUpdate = (teacher) => {
        setSelectedTeacher(teacher);
        setAction('update');
    };

    const handleDelete = (teacher) => {
        setSelectedTeacher(teacher);
        setAction('delete');
    };

    const handleCreate = () => {
        setAction('create');
    };

    const handleUpdateSuccess = async (updatedTeacher) => {
        setTeachers((prevTeachers) =>
            prevTeachers.map((t) => (t.teacherID === updatedTeacher.teacherID ? updatedTeacher : t))
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
        setSelectedTeacher(null);
        setAction(null);
    };

    const renderActionComponent = () => {
        switch (action) {
            case 'details':
                return <TeacherDetails teacher={selectedTeacher} onClose={handleClose} />;
            case 'update':
                return (
                    <TeacherUpdate
                        teacher={selectedTeacher}
                        onUpdate={handleUpdateSuccess}
                        onClose={handleClose}
                        updateTeachers={setTeachers}
                    />
                );
            case 'delete':
                return (
                    <TeacherDelete teacher={selectedTeacher} onDelete={handleDeleteSuccess} onClose={handleClose} />
                );
            case 'create':
                return <TeacherCreate onCreate={handleCreateSuccess} onClose={handleClose} />;
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
                    <h1>Teachers</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleCreate} variant="primary">
                        Create New Teacher
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>Teacher Name</th>
                        <th>Phone Number</th>
                        <th>Classes Per Week</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.teacherID}>
                            <td>{teacher.teacherID}</td>
                            <td>{teacher.teacherName}</td>
                            <td>{teacher.phoneNumber}</td>
                            <td>{teacher.teacherClassesPerWeek}</td>
                            <td>
                                <Button onClick={() => handleDetails(teacher)} variant="info" size="sm" className="me-2">
                                    Details
                                </Button>
                                <Button onClick={() => handleUpdate(teacher)} variant="warning" size="sm" className="me-2">
                                    Update
                                </Button>
                                <Button onClick={() => handleDelete(teacher)} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {action === 'create' && <TeacherCreate onCreate={handleCreateSuccess} onClose={handleClose} />}

            {selectedTeacher && renderActionComponent()}
        </Container>
    );
};

export default TeacherList;
