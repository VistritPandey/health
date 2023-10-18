import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from './firebase'; // Import the Firebase app instance

function PatientFeedback() {
  const [roomNumber, setRoomNumber] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = async () => {
    const db = getFirestore(app);
    const feedbackCollection = collection(db, 'patientFeedback');

    // Include the doctor ID in the feedback data
    try {
      await addDoc(feedbackCollection, {
        roomNumber,
        doctorId,
        feedback,
        timestamp: Date.now(),
      });
      setRoomNumber('');
      setDoctorId('');
      setFeedback('');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  return (
    <div>
      <h2>Patient Feedback</h2>
      <input
        type="text"
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <textarea
        placeholder="Enter your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
    </div>
  );
}

export default PatientFeedback;
