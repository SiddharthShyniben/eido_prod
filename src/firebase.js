// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDoK1booCZ4OxDkx-BorJOl20ZkmWIsh0",
  authDomain: "eido-tuts.firebaseapp.com",
  projectId: "eido-tuts",
  storageBucket: "eido-tuts.appspot.com",
  messagingSenderId: "668898920666",
  appId: "1:668898920666:web:72ec79ba7af7934048fde3",
  measurementId: "G-X1V177P1DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
