import React, { Component, useState } from "react"
import {firebase, db, database, storage} from "../config/firebaseConfig"



const LoginButton =()=>{


    

  const rootref = database.ref("Users");


  const createPair = ()=>{
        
    console.log("Happened")
    var bound = 0
    rootref.orderByKey().on('value', snapshot => {
        console.log(typeof snapshot.val().keys());
        bound = Object.keys(snapshot.val()).length
      })

    var index = parseInt((Math.random()*bound));
    var strindex = index.toString()

    var tname = ''
    var temail = ''
    var tlist = []
    rootref.orderByKey().equalTo(strindex).on("value", snapshot => {
       
        tname = Object.values(snapshot.val())[0]['Names']
        temail = Object.values(snapshot.val())[0]['Emails']
        tlist = [tname, temail]
        
        return tlist
        } ); 

        return tlist
        
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
    var google_provider = new firebase.auth.GoogleAuthProvider()
    var mypair = createPair();
    var pname = mypair[0]
    var pemail = mypair[1]
    console.log("The pair name and email: "+createPair())
    
    firebase.auth().signInWithPopup(google_provider)
    .then((re)=>{
      if(firebase.auth().currentUser.email.includes("milton.edu")){
        console.log("User Logged");
        var docRef = db.collection("users").doc(re.user.uid);

        docRef.get().then((doc) => {
          if (!doc.exists) {
            db.collection('users').doc(re.user.uid).set({
              name: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
              class: getClass(firebase.auth().currentUser.email),
              uid: createUid(firebase.auth().currentUser.displayName),
              pair_name: pname,
              pair_email: pemail
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
        <button onClick={SignInWithFirebase}>Sign In with Google</button>
        )
  }


export default LoginButton