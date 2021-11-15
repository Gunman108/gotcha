import React, { Component, useState } from "react"
import {firebase, db, database, storage} from "../config/firebaseConfig"
import '../stylesheets/Login.css'



const LoginButton =()=>{


    

  const rootref = database.ref("pairings");
  const rootref2 = database.ref("names")

async function findName(m){
    var z
    m = m.toString()
    m = m.replace(".edu","")
    rootref2.orderByChild("Emails").equalTo(m).on('value', snapshot => {
      z = Object.values(snapshot.val())[0]['Names'];
      console.log("z: ",z)
    });
    return z;
  }

async function findPair(m){
    var p
    console.log("user email:",m)
    m = m.toString()
    m = m.replace(".edu","")
    rootref.orderByChild("Email").equalTo(m).on('value', snapshot => {
        console.log("Object.values:",Object.values(snapshot.val())[0]['Pairing'])
        p = Object.values(snapshot.val())[0]['Pairing'];
        console.log("pe: ",p)
      });
   return p;
}

async function findPairname(p){
  var n
  console.log("pn: ",p)
  if(p != null){
  rootref2.orderByChild("Emails").equalTo(p).on('value', snapshot => {
    n = Object.values(snapshot.val())[0]['Names'];
    console.log("n:",n)
  });
  return n;
}
}

function getPairingData(userEmail) 
{
  userEmail = userEmail.toString()
  userEmail = userEmail.replace(".edu","")
  let pairEmail;
  let pairName;
  let myName;
  rootref.orderByChild("Email").equalTo(userEmail).on('value', snapshotEmail => 
  {
    pairEmail = Object.values(snapshotEmail.val())[0]['Pairing'].toString().replace(".edu", "")
    console.log("pair email: " + pairEmail);
    rootref2.orderByChild("Emails").equalTo(pairEmail).on('value', snapshotName => 
    {
      pairName = Object.values(snapshotName.val())[0]['Names'].toString();
      console.log("pair name: " + pairName);
    });
    rootref2.orderByChild("Emails").equalTo(userEmail).on('value', snapshotMyName => 
    {
      myName = Object.values(snapshotMyName.val())[0]['Names'].toString();
      console.log("my name: " + myName);
    });
  });
  return [pairEmail, pairName, myName];
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
    
    .then(()=>{
      if(firebase.auth().currentUser.email.includes("milton.edu")){
        
        console.log("User Logged");
        var pairing_email
        var pairing_name
        var name
        var myemail = firebase.auth().currentUser.email;

        var myData = getPairingData(myemail)

        pairing_email = myData[0]
        pairing_name = myData[1]
        name = myData[2]

        console.log(myData[0],", ",myData[1],", ",myData[2])

        // (async () => {
        //     console.log(firebase.auth().currentUser.email);
  
        //     await findPair(myemail).then(value => pairing_email = value)
        //     await findPairname(pairing_email).then(value => pairing_name = value)
        //     await findName(myemail).then(value => name = value)
          
        // })();

        console.log("before DB name:",name)
        console.log("before DB pairing_name:",pairing_name)
        console.log("before DB pairing_email:",pairing_email)
        var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
        docRef.get().then((doc) => {
          if (!doc.exists) {
            console.log("DB name:",name)
            console.log("DB pairing_name:",pairing_name)
            console.log("DB pairing_email:",pairing_email)

            
            db.collection("users").doc(firebase.auth().currentUser.uid).set({
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
      }
    
        
      else{
      
        alert("Please use a valid milton.edu email")
        return
        
      }
      
   
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