import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from './firebase'; // Import the Firebase app instance

function DoctorDashboard() {
  const [doctorId, setDoctorId] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);
  const db = getFirestore(app);
  const feedbackCollection = collection(db, 'patientFeedback');

  const handleDoctorIdSubmit = async () => {
    // You can add additional validation for the doctorId here
    fetchFeedbackForDoctor(doctorId);
  };

  const fetchFeedbackForDoctor = async (id) => {
    const q = query(feedbackCollection, where('doctorId', '==', id));
    const querySnapshot = await getDocs(q);

    const feedbackArray = [];
    querySnapshot.forEach((doc) => {
      feedbackArray.push(doc.data());
    });

    setFeedbackData(feedbackArray);
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <button onClick={handleDoctorIdSubmit}>View Feedback</button>

      <ul>
        {feedbackData.map((feedback, index) => (
          <li key={index}>
            <strong>Patient Room: {feedback.roomNumber}</strong>
            <p>Doctor ID: {feedback.doctorId}</p>
            <p>Feedback: {feedback.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
