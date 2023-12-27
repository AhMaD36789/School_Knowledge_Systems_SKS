import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import api from '../Api/api';
import LevelDetails from './LevelDetails';
import LevelDelete from './LevelDelete';
import LevelUpdate from './LevelUpdate';
import LevelCreate from './LevelCreate';

const LevelsList = () => {
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [action, setAction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('Levels');
            setLevels(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    const handleDetails = (level) => {
        setSelectedLevel(level);
        setAction('details');
    };

    const handleUpdate = (level) => {
        setSelectedLevel(level);
        setAction('update');
    };

    const handleDelete = (level) => {
        setSelectedLevel(level);
        setAction('delete');
    };

    const handleCreate = () => {
        setAction('create');
    };

    const handleUpdateSuccess = async (updatedLevel) => {
        // Update the levels array with the updated level
        setLevels((prevLevels) =>
            prevLevels.map((l) => (l.levelID === updatedLevel.levelID ? updatedLevel : l))
        );

        handleClose();
    };

    const handleDeleteSuccess = async () => {
        await fetchData(); // Refresh the list after deleting a level
        handleClose();
    };

    const handleCreateSuccess = async () => {
        await fetchData(); // Refresh the list after creating a new level
        handleClose();
    };

    const handleClose = () => {
        setSelectedLevel(null);
        setAction(null);
    };

    const renderActionComponent = () => {
        switch (action) {
            case 'details':
                return <LevelDetails level={selectedLevel} onClose={handleClose} />;
            case 'update':
                return (
                    <LevelUpdate
                        level={selectedLevel}
                        onUpdate={handleUpdateSuccess}
                        onClose={handleClose}
                    />
                );
            case 'delete':
                return (
                    <LevelDelete
                        level={selectedLevel}
                        onDelete={handleDeleteSuccess}
                        onClose={handleClose}
                    />
                );
            case 'create':
                return <LevelCreate onCreate={handleCreateSuccess} onClose={handleClose} />;
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
                    <h1>Levels</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleCreate} variant="primary">
                        Create New Level
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Level ID</th>
                        <th>Students</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level) => (
                        <tr key={level.levelID}>
                            <td>{level.levelID}</td>
                            <td>{level.studentsCount}</td>
                            <td>
                                <Button onClick={() => handleDetails(level)} variant="info" size="sm" className="me-2">
                                    Details
                                </Button>
                                <Button onClick={() => handleUpdate(level)} variant="warning" size="sm" className="me-2">
                                    Update
                                </Button>
                                <Button onClick={() => handleDelete(level)} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Conditionally render LevelCreate component */}
            {action === 'create' && <LevelCreate onCreate={handleCreateSuccess} onClose={handleClose} />}

            {/* Conditionally render other action components */}
            {selectedLevel && renderActionComponent()}
        </Container>
    );
};

export default LevelsList;
