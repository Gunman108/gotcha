import React, { Component, useState } from "react"
import {firebase, db, database, storage} from "../config/firebaseConfig"
import '../stylesheets/Login.css'



const LoginButton =()=>{


    

  const rootref = database.ref("pairings");
  const rootref2 = database.ref("names")

function findName(){
    var z
    var mail = firebase.auth().currentUser.email.replace(".edu","")
    rootref2.orderByChild("Emails").equalTo(mail).on('value', snapshot => {
      z = Object.values(snapshot.val())[0]['Names'];
      console.log("z: ",z)
    });
    return z;
  }

function findPair(){
    var p
    var mail = firebase.auth().currentUser.email.replace(".edu","")
    rootref.orderByChild("Email").equalTo(mail).on('value', snapshot => {
        console.log("Object.values:",Object.values(snapshot.val())[0]['Pairing'])
        p = Object.values(snapshot.val())[0]['Pairing'];
        console.log("p: ",p)
      });
   return p;
}

function findPairname(p){
  var n
  console.log("p: ",p)
  if(p != null){
  rootref2.orderByChild("Emails").equalTo(p).on('value', snapshot => {
    n = Object.values(snapshot.val())[0]['Names'];
    console.log("n:",n)
  });
  return n;
}
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
        var pairing_email
        var pairing_name
        var name
        ;(async () => {

          return await [findPair(), findPairname(await findPair()), findName()]
        })().then(value => {pairing_email = value[0];
                            pairing_name = value[1]
                            name = value[2]
                            
        
        console.log("pairing_name" + pairing_name)
        console.log("pairing_email" + pairing_email)
        console.log("name" + name)
        
        var docRef = db.collection("users").doc(re.user.uid);

        docRef.get().then((doc) => {
          if (!doc.exists) {
            db.collection('users').doc(firebase.auth().currentUser.uid).set({
              name: name,
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
        <body>
          <div className="login-button-div">
        <button type="button" className="login-button" onClick={SignInWithFirebase}>
          <span class="button-text">Enter the Gotcha Zone!</span>
        </button>
        </div>
        </body>
        )
  }


export default LoginButton