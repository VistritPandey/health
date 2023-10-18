import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import {app} from './firebase';

function DoctorDashboard() {
  const [doctorId, setDoctorId] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);
  const db = getFirestore(app);
  const feedbackCollection = collection(db, 'patientFeedback');

  const handleDoctorIdSubmit = async () => {
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
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Doctor Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        className="w-full p-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={handleDoctorIdSubmit}
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        View Feedback
      </button>

      <ul className="mt-4">
        {feedbackData.map((feedback, index) => (
          <li key={index} className="p-4 border rounded my-2">
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
