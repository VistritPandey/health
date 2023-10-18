import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {app} from './firebase';

function PatientFeedback() {
  const [roomNumber, setRoomNumber] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = async () => {
    const db = getFirestore(app);
    const feedbackCollection = collection(db, 'patientFeedback');

    try {
      // Save feedback with a unique ID
      const feedbackId = (Date.now() + Math.floor(Math.random() * 1000)).toString();

      const docRef = await addDoc(feedbackCollection, {
        roomNumber,
        doctorId,
        feedback,
        feedbackId,
        timestamp: Date.now(),
      });

      // Get the unique ID (document ID) of the saved feedback

      // Include the feedback ID in the state or use it as needed
      console.log('Feedback ID:', feedbackId);

      setRoomNumber('');
      setDoctorId('');
      setFeedback('');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Patient Feedback</h2>
      <input
        type="text"
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        className="w-full p-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        className="w-full p-2 mt-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
      />
      <textarea
        placeholder="Enter your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full p-2 mt-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={handleFeedbackSubmit}
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Submit Feedback
      </button>
    </div>
  );
}

export default PatientFeedback;
