import React, { Component } from "react"
import {firebase, db} from "../config/firebaseConfig"



const LoginButton =()=>{
    
  const SignInWithFirebase = ()=>{
    var google_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(google_provider)
    .then((re)=>{
      // return db.collection('users').doc(re.user.uid).set({
      //   name: firebase.auth().currentUser.displayName,
      //   email: firebase.auth().currentUser.email,
      // })
   
    })
    .catch((err)=>{
      console.log(err);
    })
  }


        return(
        <button onClick={SignInWithFirebase}>Sign In with Google</button>
        )
  }


export default LoginButton