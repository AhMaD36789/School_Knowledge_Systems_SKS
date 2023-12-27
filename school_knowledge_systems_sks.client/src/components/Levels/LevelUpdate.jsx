import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../Api/api';

const LevelUpdate = ({ level, onUpdate, onClose }) => {
	const [updatedLevel, setUpdatedLevel] = useState({ ...level });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedLevel((prevLevel) => ({
			...prevLevel,
			[name]: value,
		}));
	};

	const handleUpdate = async () => {
		try {
			// Make a PUT request to update the level
			const response = await api.put(`Levels/${level.levelID}`, updatedLevel);

			// Call the onUpdate callback with the updated level
			onUpdate(response.data);

			console.log('Level updated successfully:', response.data);
			onClose(); // Close the update form after a successful update
		} catch (error) {
			console.error('Error updating level:', error);
		}
	};

	return (
		<Modal show={true} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Level</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="studentsCount">
						<Form.Label>Students:</Form.Label>
						<Form.Control
							type="number"
							name="studentsCount"
							value={updatedLevel.studentsCount}
							onChange={handleInputChange}
							autoComplete="off"
						/>
					</Form.Group>					
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleUpdate}>
					Update
				</Button>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default LevelUpdate;
