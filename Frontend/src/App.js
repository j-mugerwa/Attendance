import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterUserForm from './pages/RegisterUser';
import AttendanceCapture from './pages/AttendanceCapture';
import HomePage from './pages/HomePage';
//import { useSelector } from 'react-redux';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Reports from './pages/Reports';
import RegisteredUsers from './pages/RegisteredUsers';
import AttendanceSummary from './pages/AttendanceSummary';
import AttendanceRecords from './pages/AttendanceRecords';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterUserForm />} />
        <Route path="/attend" element={<AttendanceCapture />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/registered" element={<RegisteredUsers />} />
        <Route path="/attend-reports" element={<AttendanceSummary />} />
        <Route path="/attend-records" element={<AttendanceRecords />} />

      </Routes>
      <Footer />

    </Router>
  );
};

export default App;
