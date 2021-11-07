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

  useEffect(()=> {
      createPair();
      getPhoto(email);
      } ,[]);
      
  function createPair(){
      
      console.log("Happened")
      var bound = 0
      rootref.orderByKey().on('value', snapshot => {
          console.log(typeof snapshot.val().keys());
          bound = Object.keys(snapshot.val()).length
          console.log("Bound:" + bound)
        })
      var index = parseInt((Math.random()*bound));
      console.log("index:" + index);
      var strindex = index.toString()
  
      rootref.orderByKey().equalTo(strindex).on("value", function(snapshot) {
          console.log("Names:",Object.values(snapshot.val())[0]['Names'])
          console.log("Emails:",Object.values(snapshot.val())[0]['Emails'])
          setEmail(Object.values(snapshot.val())[0]['Emails'])
          setName(Object.values(snapshot.val())[0]['Names'])
          console.log("Current email:",email)
          console.log("Current name:",name)
          snapshot.forEach(function(data) {
              console.log("Data Key:" + data.key);
              getPhoto(email)   
          });
          });
      console.log("Yes",email);
      
  }

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