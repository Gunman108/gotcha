import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database,db} from "../config/firebaseConfig"
import LoggedIn from './LoggedIn'
import LoginButton from './loginButton'
import '../App.css'



function GoogleLogin(props) {

  const [isSignedIn, setSignIn] = useState(false);

  const [url, setUrl] = useState('');
  const [email,setEmail] = useState('')
  const [name, setName] = useState('')
  

  const rootref = database.ref("Users");

  useEffect(()=> {
    firebase.auth().onAuthStateChanged(user => {
      setSignIn(!!user)
      console.log("user", user);
    })
    } ,[]);

  async function getPhoto(email){
      email = email.replace('.edu','');
      var url = "";
      console.log("photos/"+email+".png");
      var refer = await storage.ref("faces/photos/"+email+".png").getDownloadURL();
      console.log(refer);
      setUrl(refer);
      return refer;
    }

  


    return (
   
      <div className="App-bg">
        {isSignedIn ? (

          <LoggedIn />

        ) : (

          <LoginButton />

        )}
        
      </div>
    )
  }


export default GoogleLogin