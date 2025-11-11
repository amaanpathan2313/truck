
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEVDUzgA5WSZDCxffMELUoa-O1uksYWT0",
  authDomain: "react-auth-2daa2.firebaseapp.com",
  databaseURL: "https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-auth-2daa2",
  storageBucket: "react-auth-2daa2.firebasestorage.app",
  messagingSenderId: "68251067508",
  appId: "1:68251067508:web:61fd97e308668c65c85d21",
  measurementId: "G-K308RTR2BQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


export { auth }