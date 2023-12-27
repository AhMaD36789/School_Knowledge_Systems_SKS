import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const SectionDelete = ({ section, onDelete, onClose }) => {
	const handleDelete = async () => {
		try {
			await api.delete(`Sections/${section.sectionID}`);
			onDelete();
		} catch (error) {
			console.error('Error deleting section:', error);
		}
	};

	return (
		<Modal show={true} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Delete Section</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to delete this section?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={handleDelete}>
					Delete
				</Button>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SectionDelete;
