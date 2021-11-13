import React, { Component, useState, useEffect } from "react"
import { Link } from "react-router-dom";
import {firebase, storage, database,db} from "../config/firebaseConfig"
import LoggedIn from './LoggedIn'
import LoginButton from './loginButton'
import OutPage from './OutPage'
import '../App.css'
import '../stylesheets/Main.css'



function GoogleLogin(props) {

  const [isSignedIn, setSignIn] = useState(false);
  const [email,setEmail] = useState('')


  useEffect(()=> {
    
    firebase.auth().onAuthStateChanged(user => {
      setSignIn(!!user)
      
      console.log("user", user);
      if(firebase.auth().currentUser !== null){
        getName();
      }
      
    
    })
    } ,[]);

    function getName(){
    if(firebase.auth().currentUser !== null){
    db.collection('users').doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
      if(snapshot.exists){
        setEmail(snapshot.data().pairing)
      }
      
    })
  }
  }

    return (
   
      <div className="App-bg">
        <div><Link className="page-link" to="/leaderboard">Leaderboard</Link></div>
        
        {isSignedIn ? (
          [(email == '' ? (      
              <OutPage />
            ) : (
              <LoggedIn />
            )
            )]
        ) : (
          <LoginButton />
        )}
      </div>
    )
  }


export default GoogleLogin