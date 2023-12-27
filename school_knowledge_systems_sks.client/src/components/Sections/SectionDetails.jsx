import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SectionDetails = ({ section, onClose }) => {
	return (
		<Modal show={true} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Section Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Section ID: {section.sectionID}</p>
				<p>Level ID: {section.levelID}</p>
				<p>Student Count: {section.studentCount}</p>
				<p>Classes Per Week: {section.noOfClassesPerWeek}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SectionDetails;
