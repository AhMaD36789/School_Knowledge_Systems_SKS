import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand as={Link} to="/">
				SKS - School Knowledge Systems
			</Navbar.Brand>
			<Nav className="ml-auto">
				<Nav.Link as={Link} to="/levels">
					Levels
				</Nav.Link>
				<Nav.Link as={Link} to="/sections">
					Sections
				</Nav.Link>
				<Nav.Link as={Link} to="/students">
					Students
				</Nav.Link>
				<Nav.Link as={Link} to="/teachers">
					Teachers
				</Nav.Link>
				<Nav.Link as={Link} to="/subjects">
					Subjects
				</Nav.Link>
			</Nav>
		</Navbar>
	);
};

export default CustomNavbar;
