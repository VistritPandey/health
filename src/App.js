import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DoctorDashboard from './Doctor';
import PatientFeedback from './Patient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientFeedback />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
