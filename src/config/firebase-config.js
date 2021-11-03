import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCTr4Be2XggUTfnRrBJkM7cOcFlrK1GZxk",
  authDomain: "gotcha-946a7.firebaseapp.com",
  projectId: "gotcha-946a7",
  storageBucket: "gotcha-946a7.appspot.com",
  messagingSenderId: "1084980048897",
  appId: "1:1084980048897:web:e1f356fed421b36fe1fc00",
  measurementId: "G-FLMVDG7RS5"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.analytics();

export default firebase;