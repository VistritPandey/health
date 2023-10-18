import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import {app, logout, auth} from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

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

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <div className="dashboard__container">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold mb-2">Doctor Dashboard</p>
            <p className="text-sm text-gray-600">
              Logged in as: {name} ({user?.doctorId})
            </p>
          </div>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>

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
