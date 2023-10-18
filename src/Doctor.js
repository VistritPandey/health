import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app, logout, auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);
  const db = getFirestore(app);
  const feedbackCollection = collection(db, 'patientFeedback');

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);

      // Fetch feedback for the doctor from the database
      const feedbackArray = await fetchFeedbackForDoctor(data.doctorId);
      setFeedbackData(feedbackArray);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching user data');
    }
  };

  const fetchFeedbackForDoctor = async (doctorId) => {
    const q = query(feedbackCollection, where('doctorId', '==', doctorId));
    const querySnapshot = await getDocs(q);

    const feedbackArray = [];
    querySnapshot.forEach((doc) => {
      feedbackArray.push(doc.data());
    });

    return feedbackArray;
  };

  const handleDeleteFeedback = async (feedbackDocId) => {
    try {
      await deleteDoc(doc(db, 'patientFeedback', feedbackDocId));
  
      // Remove the deleted feedback from the local state
      setFeedbackData((prevFeedbackData) =>
        prevFeedbackData.filter((feedback) => feedback.feedbackId !== feedbackDocId)
      );
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting feedback');
    }
  };
  

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
    fetchUserData();
  }, [user, loading, navigate]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <div className="dashboard__container">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold mb-2">Doctor Dashboard</p>
            <p className="text-sm text-gray-600">
              Logged in as: {name}
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

      <ul className="mt-4">
        {feedbackData.length > 0 ? (
          feedbackData.map((feedback, index) => (
            <li key={index} className="p-4 border rounded my-2">
              <strong>Patient Room: {feedback.roomNumber}</strong>
              <p>Feedback: {feedback.feedback}</p>
              {/*<button
                onClick={() => handleDeleteFeedback(feedback.feedbackId)}
                className="px-2 py-1 mt-2 bg-red-500 text-white rounded hover-bg-red-600 focus:outline-none"
                >
                Delete
                </button> */}
            </li>
          ))
        ) : (
          <p>No feedbacks!</p>
        )}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
