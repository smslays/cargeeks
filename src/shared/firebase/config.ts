// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ7YYgnZRfd6QuoKnRfb34wEe2GCIEw28",
  authDomain: "cargeeks-7e1a5.firebaseapp.com",
  projectId: "cargeeks-7e1a5",
  storageBucket: "cargeeks-7e1a5.appspot.com",
  messagingSenderId: "742931369270",
  appId: "1:742931369270:web:56c18e2c09ec9932fdf797",
  measurementId: "G-CTC2JG4Z17",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
