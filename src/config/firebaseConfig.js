import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCTr4Be2XggUTfnRrBJkM7cOcFlrK1GZxk",
  authDomain: "gotcha-946a7.firebaseapp.com",
  projectId: "gotcha-946a7",
  storageBucket: "gotcha-946a7.appspot.com",
  messagingSenderId: "1084980048897",
  appId: "1:1084980048897:web:bbb6404d16053793e1fc00",
  measurementId: "G-Z9Z40JXQLD"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {

  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logout,
  firebase,
};
