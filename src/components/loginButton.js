import React, { Component } from "react"
import {firebase} from "../config/firebaseConfig"


const LoginButton =()=>{
    
  const SignInWithFirebase = ()=>{
    var google_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(google_provider)
    .then((re)=>{
      console.log(re);
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