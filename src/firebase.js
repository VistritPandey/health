// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBHYGKYNgJjd6_ffFKvF2KTwFdqEBT_Kw",
  authDomain: "healthy-mamma.firebaseapp.com",
  projectId: "healthy-mamma",
  storageBucket: "healthy-mamma.appspot.com",
  messagingSenderId: "727193605253",
  appId: "1:727193605253:web:5cc2a42e7e1406fe3785ec",
  measurementId: "G-MR0YKY3FBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;