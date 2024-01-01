// SectionList.jsx
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col, Modal } from 'react-bootstrap';
import api from '../Api/api';
import SectionDetails from './SectionDetails';
import SectionDelete from './SectionDelete';
import SectionUpdate from './SectionUpdate';
import SectionCreate from './SectionCreate';
import ShuffleStudents from './ShuffleStudents'; // Import the new component

const SectionList = () => {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [action, setAction] = useState(null);
    const [error, setError] = useState(null);
    const [showShuffleModal, setShowShuffleModal] = useState(false); // New state for ShuffleStudents modal

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('Sections');
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    const handleDetails = (section) => {
        setSelectedSection(section);
        setAction('details');
    };

    const handleUpdate = (section) => {
        setSelectedSection(section);
        setAction('update');
    };

    const handleDelete = (section) => {
        setSelectedSection(section);
        setAction('delete');
    };

    const handleCreate = () => {
        setSelectedSection({});
        setAction('create');
    };

    const handleShuffleSuccess = async () => {
        await fetchData();
        handleCloseShuffle();
    };

    const handleUpdateSuccess = async (updatedSection) => {
        setSections((prevSections) =>
            prevSections.map((s) => (s.SectionID === updatedSection.SectionID ? updatedSection : s))
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
        setSelectedSection(null);
        setAction(null);
    };

    const handleShuffleClick = () => {
        setShowShuffleModal(true);
    };

    const handleCloseShuffle = () => {
        setShowShuffleModal(false);
    };

    const renderActionComponent = () => {
        switch (action) {
            case 'details':
                return <SectionDetails section={selectedSection} onClose={handleClose} />;
            case 'update':
                return (
                    <SectionUpdate
                        section={selectedSection}
                        onUpdate={handleUpdateSuccess}
                        onClose={handleClose}
                    />
                );
            case 'delete':
                return (
                    <SectionDelete section={selectedSection} onDelete={handleDeleteSuccess} onClose={handleClose} />
                );
            case 'create':
                return <SectionCreate onCreate={handleCreateSuccess} onClose={handleClose} />;
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
                    <h1>Sections</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleCreate} variant="primary">
                        Create New Section
                    </Button>
                    <Button onClick={handleShuffleClick} variant="success" className="ms-2">
                        Shuffle and Distribute Students
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Section ID</th>
                        <th>Level ID</th>
                        <th>Student Count</th>
                        <th>No. of Classes Per Week</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((section) => (
                        <tr key={section.sectionID}>
                            <td>{section.sectionID}</td>
                            <td>{section.levelID}</td>
                            <td>{section.studentCount}</td>
                            <td>{section.noOfClassesPerWeek}</td>
                            <td>
                                <Button onClick={() => handleDetails(section)} variant="info" size="sm" className="me-2">
                                    Details
                                </Button>
                                <Button onClick={() => handleUpdate(section)} variant="warning" size="sm" className="me-2">
                                    Update
                                </Button>
                                <Button onClick={() => handleDelete(section)} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedSection && renderActionComponent()}

            {showShuffleModal && (
                <ShuffleStudents onShuffleSuccess={handleShuffleSuccess} onClose={handleCloseShuffle} />
            )}
        </Container>
    );
};

export default SectionList;
