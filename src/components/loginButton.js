import React, { Component } from "react"
import {firebase, db} from "../config/firebaseConfig"



const LoginButton =()=>{

  const getClass = (email)=>{
    if(email.includes("22")){
      return 1;
    }
    if(email.includes("23")){
      return 2;
    }
    if(email.includes("24")){
      return 3;
    }
    if(email.includes("25")){
      return 4;
    }
  }
    
  const SignInWithFirebase = ()=>{
    var google_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(google_provider)
    .then((re)=>{
      if(firebase.auth().currentUser.email.includes("milton.edu")){
        return db.collection('users').doc(re.user.uid).set({
          name: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          class: getClass(firebase.auth().currentUser.email)
        })
      }
      else{
        alert("Please use a valid milton.edu email")
      }
      
   
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