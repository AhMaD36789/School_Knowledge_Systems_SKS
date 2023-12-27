import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Home/Footer';
import LevelsList from './components/Levels/LevelsList';
import SectionList from './components/Sections/SectionList';
import StudentList from './components/Students/StudentList';
import SubjectList from './components/Subjects/SubjectList';
import TeacherList from './components/Teachers/TeacherList';

const App = () => {
	return (
		<Router>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/levels" element={<LevelsList />} />
					<Route path="/sections" element={<SectionList />} />
					<Route path="/students" element={<StudentList />} />
					<Route path="/subjects" element={<SubjectList />} />
					<Route path="/teachers" element={<TeacherList />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
