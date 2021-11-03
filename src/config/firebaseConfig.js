import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTr4Be2XggUTfnRrBJkM7cOcFlrK1GZxk",
  authDomain: "gotcha-946a7.firebaseapp.com",
  projectId: "gotcha-946a7",
  storageBucket: "gotcha-946a7.appspot.com",
  messagingSenderId: "1084980048897",
  appId: "1:1084980048897:web:e1f356fed421b36fe1fc00",
  measurementId: "G-FLMVDG7RS5"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export {firebase}