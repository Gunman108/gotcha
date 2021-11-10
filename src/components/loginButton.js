import React, { Component, useState } from "react"
import {firebase, db, database, storage} from "../config/firebaseConfig"
import '../Login.css'



const LoginButton =()=>{


    

  const rootref = database.ref("pairings");
  const rootref2 = database.ref("names")


  const createPair = ()=>{
        
    console.log("Happened")
    var mail = firebase.auth().currentUser.email.replace(".edu","")
    var p
    var n

    rootref.orderByChild("Email").equalTo(mail).on('value', snapshot => {
        console.log("Object.values:",Object.values(snapshot.val())[0]['Pairing'])
        p = Object.values(snapshot.val())[0]['Pairing'];
        console.log("p: ",p)
      });
    
    rootref2.orderByChild("Emails").equalTo(p).on('value', snapshot => {
      n = Object.values(snapshot.val())[0]['Names'];
    });
    return [p,n];
}

async function getPhoto(email){
    email = email.replace('.edu','');
    var url = "";
    
    console.log("photos/"+email+".png");
    var refer = await storage.ref("faces/photos/"+email+".png").getDownloadURL();
    console.log(refer);
   
    return refer;
  }

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

  const createUid =(name)=>{
    name = name.toLowerCase();
    name = name.replace(/ /g,"_");
    return name;
  }
    
  const SignInWithFirebase = ()=>{
    console.log("SIGN in process begun")
    var google_provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(google_provider)
    .then((re)=>{
      if(firebase.auth().currentUser.email.includes("milton.edu")){
        console.log("User Logged");
        var pairing = createPair();
        var pairing_email = pairing[0];
        var pairing_name = pairing[1];
        console.log(pairing_email)
        console.log(pairing_name)
        var docRef = db.collection("users").doc(re.user.uid);

        docRef.get().then((doc) => {
          if (!doc.exists) {
            db.collection('users').doc(re.user.uid).set({
              name: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
              class: getClass(firebase.auth().currentUser.email),
              uid: createUid(firebase.auth().currentUser.displayName),
              out: false,
              tags: 0,
              pairing: pairing_email,
              pairing_name: pairing_name,
            })
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

        
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
        <button className="login-button" onClick={SignInWithFirebase}>Sign In with Google</button>
        )
  }


export default LoginButton